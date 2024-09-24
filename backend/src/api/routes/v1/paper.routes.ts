import { Router } from 'express';
import { isAuthenticated } from '@/api/middleware/isAuthenticated';
import { isAuthorized } from '@/api/middleware/isAuthorized';
import {
  addPaper,
  archivePaper,
  deletePaper,
  getBookmarksByUser,
  getPaperById,
  getPapers,
  searchPapers,
  updatePaper,
} from '@/api/controllers/paper.controler';
import { toggleBookmark } from '@/api/models/paper.model';
import { userRole } from '@/api/middleware/userRole';

const router = Router();

router.get('/', getPapers);
router.get('/:id', getPaperById);
router.post('/', isAuthenticated, isAuthorized, userRole('admin'), addPaper);
router.put('/:id', isAuthenticated, isAuthorized, userRole('admin'), updatePaper);
router.put('/archive/:id', isAuthenticated, isAuthorized, userRole('admin'), archivePaper);
router.delete('/:id', isAuthenticated, isAuthorized, userRole('admin'), deletePaper);
router.get('/search', searchPapers);
router.post('/bookmark', isAuthenticated, isAuthorized, toggleBookmark);
router.get('/bookmarks', isAuthenticated, isAuthorized, getBookmarksByUser);

const paperRoutes = router;

export default paperRoutes;
