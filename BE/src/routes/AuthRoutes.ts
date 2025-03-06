import { Router } from 'express';
import AuthController from '../controllers/AuthController';


// Initialize router and UserController
const router = Router();
const authController = new AuthController();


// Route for user sign-up
router.post('/signup', authController.signUp);

// Route for user sign-in
router.post('/signin', authController.signIn);


export default router;
