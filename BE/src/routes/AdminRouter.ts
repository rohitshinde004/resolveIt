import { Router } from 'express';
import AdminController from '../controllers/AdminController';


// Initialize router and UserController
const router = Router();
const adminController = new AdminController();


// Route for user sign-up
router.post('/create', adminController.create);



export default router;
