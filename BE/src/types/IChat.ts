import mongoose, { Document } from 'mongoose';

interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    messages: { sender: mongoose.Types.ObjectId; content: string; timestamp: Date }[];
    createdAt: Date;
}

export default IChat;
