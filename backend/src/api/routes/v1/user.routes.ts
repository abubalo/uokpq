import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addUser,
  getUserById,
  loginUser,
} from '../../controllers/user.controller';

const router = Router();

router.post('/create', addUser);
router.post('/login', loginUser);
router.get('/user:id', isAuthenticated, isAuthorized, getUserById);

const userRoutes = router;

export default userRoutes;
