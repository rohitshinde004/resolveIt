import { Router } from 'express';
import ComplaintController from '../controllers/ComplaintController';
import { upload, compressAndSaveImage } from '../middlewares/upload';

const router: Router = Router();

router.post(
    '/',
    upload.single('image'),
    compressAndSaveImage, 
    ComplaintController.createComplaint
);

router.get('/', ComplaintController.getComplaint);
router.get('/:id', ComplaintController.getComplaintById);
router.patch('/:id/status', ComplaintController.updateComplaintStatus);
router.get('/user/:userId', ComplaintController.getComplaintsByUserId);
router.get('/get/pincode', ComplaintController.getPincode);

export default router;
