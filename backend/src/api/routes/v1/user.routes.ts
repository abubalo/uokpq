import { Router } from 'express';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { isAuthorized } from '../../middleware/isAuthorized';
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from '../../controllers/user.controller';

const router = Router();

router.post('/create', addUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/user:id', isAuthenticated, isAuthorized, getUserById);
router.put('/update:id', isAuthenticated, isAuthorized, updateUser);
router.delete('/delete:id', isAuthenticated, isAuthorized, deleteUser);

const userRoutes = router;

export default userRoutes;
