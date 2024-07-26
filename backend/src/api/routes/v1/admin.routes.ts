import { userRole } from '@/api/middleware/userRole';
import { Router } from 'express';

const router = Router();

router.get('/dashboard', userRole('admin'));
router.post('/create-admin', userRole('super-admin'));

const adminRoutes = router;

export default adminRoutes;
