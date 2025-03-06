import { Router } from 'express';
import ComplaintController from '../controllers/ComplaintController';
import upload from '../middlewares/upload';

const router: Router = Router();

router.post('/', upload.single('image'), ComplaintController.createComplaint);
router.get('/:id', ComplaintController.getComplaintById);

export default router;
