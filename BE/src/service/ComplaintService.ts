import Complaint from '../models/Complaint';
import IComplaint from '../types/IComplaint';
import ComplaintDTO from '../DTO/ComplaintDTO';
import ComplaintStatus from '../types/ComplaintStatus';
import AdminService from './AdminService';
import UserDTO from '../DTO/UserDTO';
import IUser from '../types/IUser';
import ChatService from './ChatService';

class ComplaintService {
    // Function to create a new complaint
    public createComplaint = async (complaintDTO: ComplaintDTO, imageBuffer: Buffer): Promise<IComplaint> => {
        const adminService = new AdminService();
        const chatService = new ChatService();

        const { topic, desc, pincode, location, userId } = complaintDTO;

        // Create a new chat for the complaint
        const chatDTO = {
            participants: [userId], // Add the user as the initial participant
            messages: [],
        };
        const chat = await chatService.createChat(chatDTO);

        // Create a new complaint instance
        const currentDate = new Date().toISOString();
        const adminForPinCode: IUser = await adminService.getAdminByPinCode(pincode);
        if (!adminForPinCode) {
            throw new Error('No admin found for the provided pincode');
        }
        const adminObjectId = adminForPinCode._id;

        const newComplaint = new Complaint({
            topic,
            desc,
            pincode,
            location,
            userId,
            adminId: adminObjectId,
            date: currentDate,
            image: imageBuffer,
            status: ComplaintStatus.Pending,
            chatId: chat._id, // Reference the created chat
        });

        try {
            await newComplaint.save();
            return newComplaint;
        } catch (error: any) {
            throw new Error('Error saving complaint: ' + error.message);
        }
    }

    // Function to get all complaints
    public getComplaints = async (topic: string, pincode: number, status: ComplaintStatus, userId: string): Promise<IComplaint[]> => {
        try {
            const query: any = {};

            console.log('topic:', topic);
            console.log('pincode:', pincode);   
            console.log('status:', status);
            console.log('userId:', userId);

            if (topic) {
                query.topic = { $regex: topic, $options: 'i' }; // Case-insensitive match
            }
            if (pincode) {
                query.pincode = pincode;
            }
            if (status) {
                query.status = status;
            }
            if (userId) {
                query.userId = userId;
            }

            console.log('query:', query);

            const complaints = await Complaint.find(query);
            return complaints;
        } catch (error: any) {
            throw new Error('Error fetching complaints: ' + error.message);
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

    public updateComplaintStatus = async (id: Number, status: ComplaintStatus): Promise<IComplaint | null> => {
        try {
            const complaint = await Complaint.findOneAndUpdate(
                { id: id },
                { status: status },
                { new: true }
            );
            if (!complaint) {
                throw new Error('Complaint not found');
            }
            return complaint;
        } catch (error: any) {
            throw new Error('Error updating complaint status: ' + error.message);
        }
    }
}

export default ComplaintService;
