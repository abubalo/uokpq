import { Router } from 'express';
import { isAuthenticated } from '@/api/middleware/isAuthenticated';
import { isAuthorized } from '@/api/middleware/isAuthorized';
import {
  addPapper,
  archivePaper,
  deletePaper,
  getBookmarksByUser,
  getPaperById,
  getPapers,
  searchPapers,
  updatePaper,
} from '@/api/controllers/paper.controler';
import { toogleBookmark } from '@/api/models/paper.model';
import { userRole } from '@/api/middleware/userRole';
import { deleteUser } from '@/api/controllers/user.controller';

const router = Router();

router.get('/', getPapers);
router.get('/paper:id', getPaperById);
router.post(
  '/add-paper',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  addPapper
);
router.put(
  '/update-paper:id',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  updatePaper
);
router.put(
  '/archive-paper:id',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  archivePaper
);
router.delete(
  '/delete-paper:id',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  deletePaper
);
router.delete(
  '/delete-user:id',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  deleteUser
);
router.post('/search', searchPapers);
router.post('/bookmark', isAuthenticated, isAuthorized, toogleBookmark);
router.get('/bookmarks', isAuthenticated, isAuthorized, getBookmarksByUser);

const paperRoutes = router;

export default paperRoutes;
