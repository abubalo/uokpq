import { Request, Response } from 'express';
import { validatePaper } from '../../validators/paper.validator';
import * as paperModel from '../models/paper.model';
import { DatabaseError } from 'pg';
import { Paper, SearchParams } from '@/types';
import { getPaperPDF } from '@/utils/getPaperPdf';

const handleSuccess = <T>(res: Response, data: T, statusCode: number = 200) => {
  res.status(statusCode).json({ data });
};
const handleFailure = <T>(res: Response, error: T, statusCode: number) => {
  res.status(statusCode).json({ message: error });
};

export async function addPaper(req: Request, res: Response): Promise<void> {
  try {
    const paper = req.body;
    const { error } = validatePaper(paper);

    if (error) {
      return handleFailure(
        res,
        { error: error.details.map((d) => d.message).join(', ') },
        422
      );
    }

    const result = paperModel.addPaper(paper);

    if (!result) {
      return handleFailure(res, { error: 'Failed to add paper' }, 500);
    }

    return handleSuccess(
      res,
      { data: result, message: 'Data added succefully!' },
      201
    );
  } catch (error) {
    console.log('Error adding paper', error);
    if (error instanceof DatabaseError) {
      console.log(error.message);
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function getPapers(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;

    const result = await paperModel.getPapers(page, limit);

    if(!result){
      return handleFailure(res, { error: 'No papers found' }, 404);
    }

    const {papers, total} = result;

    return handleSuccess(
      res,
      { data: papers, currentPage: page, totalPage: Math.ceil(total / limit) },
      200
    );
  } catch (error) {
    console.log('Error fetching papers', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function searchPapers(req: Request, res: Response): Promise<void> {
  try {
    const {
      query,
      year,
      moduleId,
      trimesterId,
      lecturerName,
      departmentId,
      tags,
      page,
      limit,
      sortBy,
      sortOrder,
    } = req.query;

    const searchParams: SearchParams = {
      query: query as string,
      year: year ? parseInt(year as string, 10) : undefined,
      moduleId: moduleId ? parseInt(moduleId as string, 10) : undefined,
      trimesterId: trimesterId
        ? parseInt(trimesterId as string, 10)
        : undefined,
      lecturerName: lecturerName as string,
      departmentId: departmentId
        ? parseInt(departmentId as string, 10)
        : undefined,
      tags: tags
        ? ((Array.isArray(tags) ? tags : [tags]) as string[])
        : undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
      sortBy: sortBy as keyof Paper,
      sortOrder: sortOrder as 'asc' | 'desc',
    };

    const { papers, total } = await paperModel.searchPapers(searchParams);

    if (papers.length === 0) {
      return handleSuccess(
        res,
        { data: { papers: [], total: 0 }, message: 'No papers found' },
        200
      );
    }

    return handleSuccess(
      res,
      { data: { papers, total }, message: 'Papers found successfully' },
      200
    );
  } catch (error) {
    console.log('Error finding papers', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function getPaperById(req: Request, res: Response): Promise<void> {
  try {
    const paperId = req.params.id;

    if (!paperId) {
      return handleFailure(res, { error: 'Paper ID is not provided' }, 400);
    }

    const paper = await paperModel.getPaperById(paperId);

    if (!paper) {
      return handleFailure(res, { error: 'Paper not found' }, 404);
    }

    const pdfUrl = await getPaperPDF(paper.filePath);

    if (!pdfUrl) {
      return handleFailure(res, { error: 'Failed to fetch PDF content' }, 500);
    }

    return handleSuccess(res, {
      data: {
        paper,
        pdfUrl,
      },
      message: 'Successfully retrieved paper',
    });
  } catch (error) {
    console.log('Error retrieving paper', error);
    if (error instanceof DatabaseError) {
      console.log(error.message);
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function updatePaper(req: Request, res: Response): Promise<void> {
  try {
    const paperToUpdate = req.body;
    const paperId = req.params.id;

    if (!paperId) {
      return handleFailure(res, { error: 'ID is missing' }, 400);
    }

    const updatedPaper = await paperModel.updatePaper(paperId, paperToUpdate);

    if (!updatedPaper) {
      return handleFailure(res, { error: 'Fialed to update paper' }, 500);
    }

    return handleSuccess(
      res,
      { data: updatePaper, message: 'Successfully updated paper' },
      200
    );
  } catch (error) {
    console.log('Error updating paper', error);
    if (error instanceof DatabaseError) {
      console.log(error.message);
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function archivePaper(req: Request, res: Response): Promise<void> {
  try {
    const paperId = req.params.id;

    if (!paperId) {
      return handleFailure(res, { error: 'Paper ID is missing' }, 400);
    }

    const archivedPaper = await paperModel.archivePaper(paperId);

    if (!archivedPaper) {
      return handleFailure(res, { error: 'Fialed to update paper' }, 500);
    }

    return handleSuccess(res, { message: 'Successfully archived paper' }, 204);
  } catch (error) {
    console.log('Error updating paper', error);
    if (error instanceof DatabaseError) {
      console.log(error.message);
      return handleFailure(res, { error: 'Database Error' }, 500);
    }

    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function toggleBookmark(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { paperId, userId } = req.body;

    const { bookmarked, message } = await paperModel.toggleBookmark({
      userId,
      paperId,
    });

    return handleSuccess(res, { bookmarked, message }, 200);
  } catch (error) {
    console.log('Error toggling bookmark');
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database Error' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function getBookmarksByUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = req.params.id;

    if (!userId) {
      return handleFailure(res, { error: 'User ID is missing' }, 400);
    }

    const bookmarks = await paperModel.getBookmarks(userId);

    if (bookmarks.length === 0) {
      return handleSuccess(
        res,
        { data: [], message: 'No bookmarks found!' },
        404
      );
    }

    return handleSuccess(res, { data: bookmarks }, 200);
  } catch (error) {
    console.log('Error fetching bookmarked papers', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database Error' }, 500);
    }
    return handleFailure(res, { error: 'Internal server error' }, 500);
  }
}

export async function deletePaper(req: Request, res: Response): Promise<void> {
  try {
    const paperId = req.params.id;

    if (!paperId) {
      return handleFailure(res, { error: 'Missing paper ID' }, 400);
    }

    const deletedPaper = await paperModel.deletePaper(paperId);

    if (!deletedPaper) {
      return handleFailure(res, { error: 'Failed to delete paper' }, 500);
    }

    return handleSuccess(res, { message: 'Successfully deleted paper' }, 200);
  } catch (error) {
    console.log('Error deleting paper', error);
    if (error instanceof DatabaseError) {
      return handleFailure(res, { error: 'Database error' }, 500);
    }
    return handleFailure(res, { error: 'Internael server error' }, 500);
  }
}
