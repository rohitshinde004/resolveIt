import { Router } from 'express';
import UserController from '../controllers/UserController';

// Initialize router and UserController
const router = Router();
const userController = new UserController();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;