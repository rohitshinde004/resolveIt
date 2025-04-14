import { Router } from 'express';
import ChatController from '../controllers/ChatController';

const router: Router = Router();

// Route to add a message to a chat
router.post('/:chatId/messages', ChatController.addMessage);

// Route to get a chat by ID
router.get('/:chatId', ChatController.getChatById);

// Route to create a new chat
router.post('/', ChatController.createChat);

export default router;
