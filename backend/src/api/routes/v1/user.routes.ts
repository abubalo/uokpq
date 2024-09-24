import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  logoutUser,
  updateUser,
} from '@/api/controllers/user.controller';
import { userRole } from '@/api/middleware/userRole';

const router = Router();

router.post('/create', addUser);
router.post('/login', loginUser);
router.post('/logout', isAuthenticated, isAuthorized, logoutUser);
router.get('/:id', isAuthenticated, isAuthorized, getUserById);
router.get('/', isAuthenticated, isAuthorized, userRole('admin'), getUsers);
router.put('/:id', isAuthenticated, isAuthorized, updateUser);
router.delete('/:id', isAuthenticated, isAuthorized, deleteUser);

const userRoutes = router;

export default userRoutes;