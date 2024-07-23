import { deleteUser, getUsers } from '@/api/controllers/user.controller';
import { archivePaper, deletePaper, updatePaper } from '../../controllers/paper.controler';
import { isAuthenticated } from '@/api/middleware/isAuthenticated';
import { isAuthorized } from '@/api/middleware/isAuthorized';
import { userRole } from '@/api/middleware/userRole';
import { Router } from 'express';

const router = Router();

router.get('/dashboard', userRole('admin'));
router.post('/create-admin', userRole('super-admin'));
router.get(
  '/get-users:id',
  isAuthenticated,
  isAuthorized,
  userRole('admin'),
  getUsers
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

const adminRoutes = router;

export default adminRoutes;
