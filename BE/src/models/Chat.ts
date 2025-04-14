import mongoose, { Schema } from 'mongoose';
import IChat from '../types/IChat';

const ChatSchema: Schema<IChat> = new Schema({
    participants: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
    messages: [
        {
            sender: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
            content: { type: String, required: true },
            timestamp: { type: Date, required: true },
        },
    ],
    createdAt: { type: Date, required: true },
});

ChatSchema.methods.appendMessage = function (message: any) {
    this.messages.push(message);
    return this.save();
};

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
