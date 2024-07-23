import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addPapper,
  deletePaper,
  getBookmarksByUser,
  getPaperById,
  getPapers,
  searchPapers,
  updatePaper,
} from '../../controllers/paper.controler';

const router = Router();

router.post('/add', isAuthenticated, isAuthorized, addPapper);
router.get('/papers', getPapers);
router.get('/paper:id', getPaperById);
router.post('/search', searchPapers);
router.post('/bookmark', isAuthenticated, isAuthorized);
router.get('/bookmarks', isAuthenticated, isAuthorized, getBookmarksByUser);
router.put('/update:id', isAuthenticated, isAuthorized, updatePaper);
router.delete('/delete:id', isAuthenticated, isAuthorized, deletePaper);

const paperRoutes = router;

export default paperRoutes;
