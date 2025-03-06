import mongoose, { Document, Schema } from 'mongoose'; import ComplaintStatus from './ComplaintStatus';

interface IComplaint extends Document {
    id: Number;
    topic: string;
    desc: string;
    image: Buffer;
    location: string;
    pincode: Number;
    status: ComplaintStatus;
    date: Date;
    userId: mongoose.Types.ObjectId;
    adminId: mongoose.Types.ObjectId;
    chatId: mongoose.Types.ObjectId;
}

export default IComplaint;