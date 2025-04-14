import Chat from '../models/Chat';
import IChat from '../types/IChat';
import ChatDTO from '../DTO/ChatDTO';

class ChatService {
    // Function to create a new chat
    public createChat = async (chatDTO: ChatDTO): Promise<IChat> => {
        const { participants, messages } = chatDTO;

        const newChat = new Chat({
            participants,
            messages,
            createdAt: new Date(),
        });

        try {
            await newChat.save();
            return newChat;
        } catch (error: any) {
            throw new Error('Error creating chat: ' + error.message);
        }
    };

    // Function to get a chat by ID
    public getChatById = async (id: string): Promise<IChat | null> => {
        try {
            const chat = await Chat.findById(id);
            if (!chat) {
                throw new Error('Chat not found');
            }
            return chat;
        } catch (error: any) {
            throw new Error('Error fetching chat: ' + error.message);
        }
    };

    // Function to add a message to a chat
    public addMessageToChat = async (chatId: string, senderId: string, content: string): Promise<IChat | null> => {
        try {
            const updatedChat = await Chat.findByIdAndUpdate(
                chatId,
                {
                    $push: {
                        messages: {
                            sender: senderId,
                            content: content,
                            timestamp: new Date(),
                        },
                    },
                },
                { new: true }
            );

            if (!updatedChat) {
                throw new Error('Chat not found');
            }

            return updatedChat;
        } catch (error: any) {
            throw new Error('Error adding message to chat: ' + error.message);
        }
    };
}

export default ChatService;
