import { validatePaper } from '../../validators/paper.validator';
import { getClient, knex } from '../../config/db';
import { Bookmark, Bookmarks, Paper, SearchParams } from '../../types';
import { logger } from '../../utils/logger';
import { toCamelCase, toSnakeCase } from 'src/utils/caseConverter';

export const addPaper = async (paper: Paper): Promise<Paper | null> => {
  const client = getClient();
  try {
    client.query('BEGIN');

    const { error } = validatePaper(paper);

    if (error) {
      logger.error(
        `Invalid user data: ${error.details.map((d) => d.message).join(', ')}`
      );
      throw Error(
        `Invalid user data: ${error.details.map((d) => d.message).join(', ')}`
      );
    }

    const query = `INSERT INTO papers (title, file_path, year, course_id, module_id, trimester_id, lecturer_name, uploader_id,  ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const values = [
      paper.title,
      paper.filePath,
      paper.year,
      paper.courseId,
      paper.moduleId,
      paper.trimesterId,
      paper.lecturerName,
      paper.uploaderId,
    ];

    const result = await client.query<Paper>(query, values);
    await client.query('COMMIT');

    return toCamelCase(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error adding new paper', { error });
    throw error;
  }
};

export const getPapers = async (
  page: number = 1,
  limit: number = 15
): Promise<{ papers: Paper[]; total: number } | null> => {
  const client = getClient();
  try {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM papers ORDER BY id LIMIT $1 OFFSET $2`;
    const count = `SELECT COUNT(*) FROM papers`;

    const [papersResult, countResult] = await Promise.all([
      client.query<Paper>(query, [limit, offset]),
      client.query<{ count: string }>(count),
    ]);

    const papers = papersResult.rows.map((row) => toCamelCase(row));
    const total = parseInt(countResult.rows[0].count, 10);

    return { papers, total };
  } catch (error) {
    logger.error('Error fecthing papers', { error });
    throw error;
  }
};

export const getPaperById = async (id: string): Promise<Paper> => {
  const client = getClient();
  try {
    const query = `SELECT * FROM papers WHERE id = $1`;
    const result = await client.query<Paper>(query, [id]);

    if (result.rows.length === 0) {
      throw new Error(`No paper found with id ${id}`);
    }

    return toCamelCase(result.rows[0]);
  } catch (error) {
    logger.error(`Unable to fetch paper with id ${id}`, { error });
    throw error;
  }
};

export const searchPapers = async (
  params: SearchParams
): Promise<{ papers: Paper[]; total: number }> => {
  const client = getClient();
  try {
    const {
      query,
      year,
      moduleId,
      trimesterId,
      lecturerName,
      departmentId,
      tags,
      page = 1,
      limit = 15,
      sortBy = 'uploaded_at',
      sortOrder = 'desc',
    } = params;

    client.query(`
      CREATE INDEX papers_title_idx ON papers USING gin (title gin_trgm_ops);
      CREATE INDEX papers_lecturer_name_idx ON papers USING gin (lecturer_name gin_trgm_ops);
      CREATE INDEX papers_year_idx ON papers (year);
      CREATE INDEX papers_course_id_idx ON papers (course_id);
      CREATE INDEX papers_module_id_idx ON papers (module_id);
      CREATE INDEX papers_trimester_idx ON papers (trimester);
      CREATE INDEX papertags_paper_id_idx ON paperTags (paper_id);
      CREATE INDEX papertags_tag_id_idx ON paperTags (tag_id);
      `);

    let sqlQuery = `
      SELECT DISTINCT p.* 
      FROM papers p
      JOIN modules m ON p.module_id = m.id
      LEFT JOIN paperTags pt ON p.id = pt.paper_id
      LEFT JOIN tags t ON pt.tag_id = t.id
      WHERE 1=1
    `;
    const values: any[] = [];
    let paramCount = 1;

    if (query) {
      sqlQuery += ` AND (p.title ILIKE $${paramCount} OR p.lecturer_name ILIKE $${paramCount})`;
      values.push(`%${query}%`);
      paramCount++;
    }

    if (year) {
      sqlQuery += ` AND p.year = $${paramCount}`;
      values.push(year);
      paramCount++;
    }

    if (moduleId) {
      sqlQuery += ` AND p.module_id = $${paramCount}`;
      values.push(moduleId);
      paramCount++;
    }

    if (trimesterId) {
      sqlQuery += ` AND p.trimester = $${paramCount}`;
      values.push(trimesterId);
      paramCount++;
    }

    if (lecturerName) {
      sqlQuery += ` AND p.lecturer_name ILIKE $${paramCount}`;
      values.push(`%${lecturerName}%`);
      paramCount++;
    }

    if (departmentId) {
      sqlQuery += ` AND m.department_id = $${paramCount}`;
      values.push(departmentId);
      paramCount++;
    }

    if (tags && tags.length > 0) {
      sqlQuery += ` AND t.name = ANY($${paramCount}::varchar[])`;
      values.push(tags);
      paramCount++;
    }

    // Add sorting
    sqlQuery += ` ORDER BY p.${sortBy} ${sortOrder.toUpperCase()}`;

    // Add pagination
    const offset = (page - 1) * limit;
    sqlQuery += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    values.push(limit, offset);

    // Count total matching papers
    const countQuery = sqlQuery.replace(
      'SELECT DISTINCT p.*',
      'SELECT COUNT(DISTINCT p.id)'
    );
    const countValues = values.slice(0, -2); // Remove LIMIT and OFFSET for count query

    const [papersResult, countResult] = await Promise.all([
      client.query<Paper>(sqlQuery, values),
      client.query<{ count: string }>(countQuery, countValues),
    ]);

    const papers = papersResult.rows.map((row) => toCamelCase(row));
    const total = parseInt(countResult.rows[0].count, 10);

    return { papers, total };
  } catch (error) {
    logger.error('Error searching papers', { error });
    throw error;
  }
};
export const updatePaper = async (
  id: string,
  _updates: Partial<Paper>
): Promise<Omit<Paper, 'id' | 'createdAt' | 'updatedAt'>> => {
  const client = getClient();
  try {
    client.query('BEGIN');

    const updates = toSnakeCase(_updates);
    const fields = Object.keys(updates).filter(
      (key) => updates[key as keyof typeof updates] !== undefined
    );

    if (fields.length === 0) {
      logger.error('No valid fields to update');
      throw new Error('No valid fields to update');
    }
    const result = await knex('papers')
      .where({ id })
      .update({ ...updates, updated_at: knex.fn.now() })
      .returning('*');

    if (result.length === 0) {
      throw Error('Paper not found!');
    }

    await client.query('COMMIT');
    return toCamelCase(result[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error updating paper', { error });
    throw error;
  }
};

export const archivePaper = async (id: string): Promise<Paper> => {
  const client = getClient();
  try {
    await client.query('BEGIN');

    const query = `UPDATE papers SET is_archive=true WHERE id=$1 RETURNING *`;
    const result = await client.query<Paper>(query, [id]);

    if (result.rowCount === 0) {
      throw new Error(`No paper found with id ${id} to archive`);
    }
    await client.query('COMMIT');
    logger.info(`Successfully archived paper with id: ${id}`);
    return toCamelCase(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`Error archiving paper with id ${id}`, { error });
    throw error;
  }
};

export const deletePaper = async (id: string): Promise<boolean | null> => {
  const client = getClient();
  try {
    await client.query('BEGIN');

    const result = await client.query('DELETE * FROM papers WHERE id = $1', [
      id,
    ]);

    if (result.rowCount === 0) {
      throw new Error(`No paper found with id ${id} to delete`);
    }

    await client.query('COMMIT');
    logger.info(`Successfully deleted paper with id: ${id}`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`Error deleting paper with id ${id}`, { error });
    throw error;
  }
};

export const isPaperExist = async (id: string): Promise<boolean> => {
  const client = getClient();
  try {
    const query = 'SELECT EXISTS(SELECT 1 FROM papers WHERE id = $1)';
    const result = await client.query<{ exists: boolean }>(query, [id]);
    return result.rows[0].exists;
  } catch (error) {
    logger.error(`Unable to verify the existence of paper with id ${id}`, {
      error,
    });
    throw error;
  }
};

export const toggleBookmark = async ({
  userId,
  paperId,
}: Bookmark): Promise<{ bookmarked: boolean; message: string }> => {
  const client = getClient();
  try {
    client.query('BEGIN');

    const paperExistQuery = `SELECT EXISTS(SELECT 1 FROM papers  WHERE id=$1)`;
    const paperExistResult = await client.query<{ exists: boolean }>(
      paperExistQuery,
      [paperId]
    );

    if (paperExistResult.rows[0].exists) {
      throw new Error(`Paper with id ${paperId} does not exisit`);
    }
    const bookMarkExisitQuery = `SELECT EXIST(SELECT 1 FROM bookmarks WHERE user_id=$1 AND paper_id=$2)`;
    const bookmarkExisitResult = await client.query<{ exists: boolean }>(
      bookMarkExisitQuery,
      [userId, paperId]
    );

    let bookmarked: boolean;
    let message: string;

    if (bookmarkExisitResult.rows[0].exists) {
      const deleteQuery = `DELETE * FROM bookmarks WHERE user_id=$1 AND paper_id=$2`;
      await client.query(deleteQuery, [userId, paperId]);

      bookmarked = false;
      message = 'Bookmark successfully removed!';
    } else {
      const bookmarkQuery = `INSERT INTO bookmarks (user_id, paper_id) VALUES ($1, $2)`;
      await client.query(bookmarkQuery, [userId, paperId]);

      bookmarked = true;
      message = 'Successfully bookmarked!';
    }

    client.query('COMMIT');
    logger.info(
      `Successfully toogle bookmark for paper ${paperId} and user ${userId} Bookmarked:${bookmarked}`
    );
    return { bookmarked, message };
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error toggling bookmark', { error });
    throw error;
  }
};

export const getBookmarks = async (userId: string): Promise<Bookmarks[]> => {
  const client = getClient();
  try {
    const query = `SELECT 
        b.id as bookmark_id,
        b.user_id,
        b.paper_id,
        b.created_at as bookmarked_at,
        p.title as paper_title,
        p.file_path,
        p.year,
        p.module_id,
        p.trimester_id,
        p.lecturer_name,
        p.uploaded_at,
        p.updated_at,
        p.uploader_id,
        p.is_archive
        FROM 
          bookmarks b
        JOIN
        papers p ON b.paper_id = p.id
        WHERE user_id = $1
        ORDER BY
        b.created_at DESC
        `;

    const result = await client.query<Bookmarks>(query, [userId]);

    if (result.rows.length === 0) {
      return [];
    }

    const bookmarks = result.rows.map((row) => toCamelCase(row));

    return bookmarks;
  } catch (error) {
    logger.error('Error getting bookmarked papers', { error, userId });
    throw error;
  } finally {
    client.release();
  }
};
