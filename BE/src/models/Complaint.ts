import mongoose, { Document, Schema } from 'mongoose';
import IComplaint from '../types/IComplaint';
import ComplaintStatus from '../types/ComplaintStatus';

const ComplaintSchema: Schema<IComplaint> = new Schema({
    id: { type: Number, auto: true, unique: true },
    topic: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: Buffer, required: false },
    location: { type: String, required: true },
    pincode: { type: String, required: true },
    status: { type: String, required: true, enum: ComplaintStatus },
    date: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    adminId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    chatId: { type: Schema.Types.ObjectId, required: true, ref: 'Chat' },
});


ComplaintSchema.pre<IComplaint>('save', async function (next) {
    const complaint = this;

    if (complaint.isNew) {
        const lastComplaint = await mongoose.model<IComplaint>('Complaint').findOne().sort({ id: -1 });
        complaint.id = lastComplaint ? lastComplaint.id + 1 : 10001;
    }

    next();
});

const Complaint = mongoose.model<IComplaint>('Complaint', ComplaintSchema);

export default Complaint;