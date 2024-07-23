import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addPapper,
  getBookmarksByUser,
  getPaperById,
  getPapers,
  searchPapers,
} from '../../controllers/paper.controler';
import { toogleBookmark } from '@/api/models/paper.model';
import { userRole } from '@/api/middleware/userRole';

const router = Router();

router.post(
  '/add',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  addPapper
);
router.get('/papers', getPapers);
router.get('/paper:id', getPaperById);
router.post('/search', searchPapers);
router.post('/bookmark', isAuthenticated, isAuthorized, toogleBookmark);
router.get('/bookmarks', isAuthenticated, isAuthorized, getBookmarksByUser);


const paperRoutes = router;

export default paperRoutes;
