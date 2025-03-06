import mongoose from 'mongoose';
import ComplaintStatus from '../types/ComplaintStatus';

class ComplaintDTO {
    id: Number;
    topic: string;
    desc: string;
    image: Buffer;
    location: string;
    pincode: number;
    status: ComplaintStatus;
    date: Date;
    userId: mongoose.Types.ObjectId;
    adminId: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;

    constructor(
        id: Number,
        topic: string,
        desc: string,
        image: Buffer,
        location: string,
        pincode: number,
        status: ComplaintStatus,
        date: Date,
        userId: mongoose.Types.ObjectId,
        adminId: mongoose.Types.ObjectId,
        chatId: mongoose.Types.ObjectId
    ) {
        this.id = id;
        this.topic = topic;
        this.desc = desc;
        this.image = image;
        this.location = location;
        this.pincode = pincode;
        this.status = status;
        this.date = date;
        this.userId = userId;
        this.adminId = adminId;
        this.chatId = chatId;
    }
}

export default ComplaintDTO;