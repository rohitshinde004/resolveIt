import { Request, Response } from 'express';
import ComplaintService from '../service/ComplaintService';
import ComplaintDTO from '../DTO/ComplaintDTO';
import { compare } from 'bcrypt';

class ComplaintController {
    private complaintService: ComplaintService;

    constructor() {
        this.complaintService = new ComplaintService();
        this.createComplaint = this.createComplaint.bind(this);
        this.getComplaintById = this.getComplaintById.bind(this);
    }

    public createComplaint = async (req: Request, res: Response): Promise<void> => {
        try {
            const complaintDTO: ComplaintDTO = req.body;
            const imageBuffer = req.file ? req.file.buffer : Buffer.alloc(0);
            

            const newComplaint = await this.complaintService.createComplaint(complaintDTO, imageBuffer);
            res.status(201).json(newComplaint);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public getComplaintById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const complaintId = parseInt(id);
        try {
            const complaint = await this.complaintService.getComplaintById(complaintId);
            if (!complaint) {
                res.status(404).json({ message: 'Complaint not found' });
                return;
            }
            res.status(200).json(complaint);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ComplaintController();
