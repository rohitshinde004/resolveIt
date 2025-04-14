import mongoose from 'mongoose';

class ChatDTO {
    participants: mongoose.Types.ObjectId[];
    messages: { sender: mongoose.Types.ObjectId; content: string; timestamp: Date }[];

    constructor(
        participants: mongoose.Types.ObjectId[],
        messages: { sender: mongoose.Types.ObjectId; content: string; timestamp: Date }[]
    ) {
        this.participants = participants;
        this.messages = messages;
    }
}

export default ChatDTO;
