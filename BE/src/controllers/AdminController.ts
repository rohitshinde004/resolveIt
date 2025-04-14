import { NextFunction, Request, Response } from 'express';
import AdminService from '../service/AdminService';
import UserDTO from '../DTO/UserDTO';

class AdminController {
    private adminService: AdminService;

    constructor() {
        this.adminService = new AdminService();
    }

    // Controller to handle user sign-up
    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userDTO: UserDTO = req.body;
            const user = await this.adminService.createAdmin(userDTO);

            res.status(201).send({ "message": "Admin created successfully" });
        } catch (error: any) {
            res.status(400).json({ message: (error as Error).message });
        }
    };
}

export default AdminController;
