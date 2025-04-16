import { Request, Response } from 'express';
import ComplaintService from '../service/ComplaintService';
import ComplaintDTO from '../DTO/ComplaintDTO';
import { compare } from 'bcrypt';
import ComplaintStatus from '../types/ComplaintStatus';

class ComplaintController {
    private complaintService: ComplaintService;

    constructor() {
        this.complaintService = new ComplaintService();
        this.createComplaint = this.createComplaint.bind(this);
        this.getComplaintById = this.getComplaintById.bind(this);
        this.getComplaintsByUserId = this.getComplaintsByUserId.bind(this);
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
        console.log("Complaint ID:", id);
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

    public getComplaint = async (req: Request, res: Response): Promise<void> => {
        try {
            const { topic, pincode, status, userId } = req.query;
            const complaints = await this.complaintService.getComplaints(topic as string, parseInt(pincode as string), status as ComplaintStatus, userId as string);
            res.status(200).json(complaints);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    public getComplaintsByUserId = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            const complaints = await this.complaintService.getComplaintsByUserId(userId);
            res.status(200).json(complaints);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public updateComplaintStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status || !Object.values(ComplaintStatus).includes(status)) {
                res.status(400).send({ error: 'Invalid or missing status' });
                return;
            }

            const complaintService = new ComplaintService();
            const updatedComplaint = await complaintService.updateComplaintStatus(Number(id), status);

            res.status(200).send(updatedComplaint);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public getPincode = async (req: Request, res: Response): Promise<void> => {
        try {
            const pincode = await this.complaintService.getPincode();
            res.status(200).json(pincode);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ComplaintController();
