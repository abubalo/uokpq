import { Role, User } from '../../types';
import { getClient, knex } from '../../config/db';
import { toCamelCase, toSnakeCase } from '../../utils/caseConverter';
import { logger } from '../../utils/logger';
import { validateUser } from '../../validators/user.validator';
import { compare, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export const createUser = async (user: User): Promise<User> => {
  const client = getClient();
  try {
    const { error } = validateUser(user);

    if (error) {
      logger.error(
        `Invalid user data: ${error.details.map((d) => d.message).join(', ')}`
      );
      throw new Error(
        `Invalid user data: ${error.details.map((d) => d.message).join(', ')}`
      );
    }

    const hashedPassword = await hash(user.password, SALT_ROUNDS);
    const query = `INSERT INTO users (first_name, last_name, email, password) 
       VALUES ($1, $2, $3, $4) RETURNING *`;

    const values = [user.firstName, user.lastName, user.email, hashedPassword];
    const result = await client.query<User>(query, values);
    await client.query('COMMIT');

    logger.info(`Succesfully added user: ${user.email}`);
    return toCamelCase(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating user', { error });
    throw error;
  }
};

export const getUsers = async (
  page: number = 1,
  limit: number = 20
): Promise<{ users: User[]; total: number }> => {
  const client = getClient();

  try {
    const offset = (page - 1) * limit;
    const usersQuery = `
      SELECT * FROM users
      ORDER BY id
      LIMIT $1 OFFSET $2
    `;
    const countQuery = 'SELECT COUNT(*) FROM users';

    const [usersResult, countResult] = await Promise.all([
      client.query<User>(usersQuery, [limit, offset]),
      client.query<{ count: string }>(countQuery),
    ]);

    const users = usersResult.rows.map((row) => toCamelCase(row));
    const total = parseInt(countResult.rows[0].count, 10);

    return { users, total };
  } catch (error) {
    logger.error('Error fetching users', { error });
    throw error;
  }
};

export const getUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<Omit<User, 'password'> | null> => {
  const client = getClient();
  try {
    const query = 'SELECT * FROM users WHERE email = $1';

    const result = await client.query<User>(query, [email]);
    if (result.rows.length) {
      const user = toCamelCase(result.rows[0]);

      const isPasswordMatched = await compare(password, user.password);

      if (isPasswordMatched) {
        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
      }
    }

    return null;
  } catch (error) {
    logger.error('Error fetching user by id', { error, email });
    throw error;
  }
};
export const getUserById = async (
  id: string | number
): Promise<User | null> => {
  const client = getClient();
  try {
    const query = 'SELECT * FROM users WHERE id = $1';

    const result = await client.query<User>(query, [id]);
    return result.rows.length ? toCamelCase(result.rows[0]) : null;
  } catch (error) {
    logger.error('Error fetching user by id', { error, userId: id });
    throw error;
  }
};

export const _updateUser = async (
  id: string,
  _updates: Partial<User>
): Promise<User> => {
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

    const values = fields.map((_, index) => `$${index + 1}`).join(', ');
    const setClause = fields
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const query = await `UPDATE users SET ${setClause} WHERE id = $${
      fields.length + 1
    } RETURNING *`;

    const result = await client.query<User>(query, [values, id]);

    if (result.rowCount === 0) {
      throw Error('User not found!');
    }

    await client.query('COMMIT');
    logger.info(`Succesfully Updated user with id: ${updates.id}`);

    return toCamelCase(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error updating user', { error });
    throw error;
  }
};
export const updateUser = async (
  id: string | number,
  _updates: Partial<User>
): Promise<User> => {
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

    const result = await knex('users')
      .where({ id })
      .update({ ...updates, updated_at: knex.fn.now() })
      .returning('*');

    if (result.length === 0) {
      throw Error('User not found!');
    }

    await client.query('COMMIT');
    logger.info(`Succesfully Updated user with id: ${id}`);

    return toCamelCase(result[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error updating user', { error });
    throw error;
  }
};

export const isUserExist = async (id: string | number): Promise<boolean> => {
  const client = getClient();
  try {
    const result = await client.query<{ exists: boolean }>(
      'SELECT EXISTS( SELECT 1 FROM users WHERE id = $1)',
      [id]
    );
    return result.rows[0].exists;
  } catch (error) {
    logger.error('Error executing query', { error });
    throw error;
  }
};
export const isEmailExist = async (email: string): Promise<boolean> => {
  const client = getClient();
  try {
    const result = await client.query<{ exists: boolean }>(
      'SELECT EXISTS( SELECT 1 FROM users WHERE email = $1)',
      [email]
    );
    return result.rows[0].exists;
  } catch (error) {
    logger.error('Error executing query', { error });
    throw error;
  }
};

export const deleteUser = async (
  id: string | number
): Promise<boolean | null> => {
  const client = getClient();
  try {
    client.query('BEGIN');
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await client.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    await client.query('COMMIT');
    logger.info(`Sucessfully deleted user with id: ${id}`);
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error deleting user', { error, userId: id });
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const client = getClient();
  try {
    const result = await client.query<User>(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows.length ? toCamelCase(result.rows[0]) : null;
  } catch (error) {
    logger.error('Unable to retrieve user emal', { error });
    throw error;
  }
};

export const changeUserPassword = async (
  id: string,
  newPassword: string
): Promise<User> => {
  const client = getClient();
  try {
    client.query('BEGIN');

    const hashedPassword = await hash(newPassword, SALT_ROUNDS);
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *';

    const result = await client.query<User>(query, [hashedPassword, id]);
    await client.query('COMMIT');
    logger.info(`User password change sucessfully for id: ${id}`);
    return toCamelCase(result.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`Unable to update user password`, { error });
    throw error;
  }
};

export const countUsers = async (): Promise<number> => {
  const client = getClient();
  try {
    const result = await client.query<{ count: string }>(
      'SELECT COUNT(*) FROM users'
    );
    return parseInt(result.rows[0].count, 10);
  } catch (error) {
    logger.error('Unable to count users', { error });
    throw error;
  }
};

export const updateRole = async ({
  userId,
  role,
}: Role): Promise<boolean | null> => {
  const client = getClient();
  try {
    client.query('BEGIN');

    const query = `UPDATE users SET role=$1 WHERE id=$2 RETURNING *`;
    await client.query(query, [role, userId]);
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`Error updating user role`, { error });
    throw error;
  }
};
