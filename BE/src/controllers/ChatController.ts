import { Request, Response } from 'express';
import ChatService from '../service/ChatService';

class ChatController {
    // Method to add a message to a chat
    public static addMessage = async (req: Request, res: Response): Promise<void> => {
        try {
            const { chatId } = req.params;
            const { senderId, content } = req.body;

            if (!senderId || !content) {
                res.status(400).send({ error: 'Sender ID and content are required' });
                return;
            }

            const chatService = new ChatService();
            const updatedChat = await chatService.addMessageToChat(chatId, senderId, content);

            res.status(200).send(updatedChat);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public static getChatById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { chatId } = req.params;

            const chatService = new ChatService();
            const chat = await chatService.getChatById(chatId);

            if (!chat) {
                res.status(404).send({ error: 'Chat not found' });
                return;
            }

            res.status(200).send(chat);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public static createChat = async (req: Request, res: Response): Promise<void> => {
        try {
            const { participants, messages } = req.body;

            if (!participants || !Array.isArray(participants) || participants.length === 0) {
                res.status(400).send({ error: 'Participants are required and must be an array' });
                return;
            }

            const chatService = new ChatService();
            const chat = await chatService.createChat({ participants, messages: messages || [] });

            res.status(201).send(chat);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
}

export default ChatController;
