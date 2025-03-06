import { Request, Response } from 'express';
import UserService from '../service/UserService';
import UserDTO from '../DTO/UserDTO';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: UserDTO[] = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user: UserDTO | null = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const userDTO: Partial<UserDTO> = req.body;
            const user: UserDTO | null = await this.userService.updateUser(userId, userDTO);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const user: UserDTO | null = await this.userService.deleteUser(userId);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default UserController;
