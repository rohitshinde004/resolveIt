import Complaint from '../models/Complaint';
import IComplaint from '../types/IComplaint';
import ComplaintDTO from '../DTO/ComplaintDTO';
import ComplaintStatus from '../types/ComplaintStatus';

class ComplaintService {
    // Function to create a new complaint
    public createComplaint = async (complaintDTO: ComplaintDTO, imageBuffer: Buffer): Promise<IComplaint> => {
        const { topic, desc, pincode, location, userId, adminId, image } = complaintDTO;

        // Create a new complaint instance
        const currentDate = new Date().toISOString();
        const newComplaint = new Complaint({
            topic,
            desc,
            pincode,
            location,
            userId,
            adminId,
            date: currentDate,
            image: imageBuffer,
            status: ComplaintStatus.Pending,
            chatId: '65d3a5f2c45b3b00123abcd2',
        });

        try {
            await newComplaint.save();
            return newComplaint;
        } catch (error: any) {
            throw new Error('Error saving complaint: ' + error.message);
        }
    }

    // Function to get a complaint by ID
    public getComplaintById = async (id: Number): Promise<IComplaint | null> => {
        try {
            const complaint = await Complaint.findOne({ "id": id });
            if (!complaint) {
                throw new Error('Complaint not found');
            }
            return complaint;
        } catch (error: any) {
            throw new Error('Error fetching complaint: ' + error.message);
        }
    }
}

export default ComplaintService;
