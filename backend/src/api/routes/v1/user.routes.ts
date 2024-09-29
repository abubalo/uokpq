import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addUser,
  deleteUser,
  getUser,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
} from '@/api/controllers/user.controller';

const router = Router();

router.post('/create', addUser);
router.post('/login', loginUser);
router.get('/', isAuthenticated, isAuthorized, getUser);
router.get('/:id', isAuthenticated, isAuthorized, getUserById);
router.post('/logout', isAuthenticated, isAuthorized, logoutUser);
router.put('/:id', isAuthenticated, isAuthorized, updateUser);
router.delete('/:id', isAuthenticated, isAuthorized, deleteUser);

const userRoutes = router;

export default userRoutes;
