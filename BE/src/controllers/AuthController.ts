import { NextFunction, Request, Response } from 'express';
import AuthService from '../service/AuthService';
import UserDTO from '../DTO/UserDTO';

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // Controller to handle user sign-up
    public signUp = async (req: Request, res: Response , next: NextFunction) => {
        try {
            const userDTO: UserDTO = req.body;
            const password: string = req.body.password;
            const user = await this.authService.signUp(userDTO, password);
            res.status(201).send({ "message": "User created successfully" });
        } catch (error: any) {
            res.status(400).json({ message: (error as Error).message });
        }
    };

    // Controller to handle user sign-in
    public signIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.signIn(email, password);
            res.status(200).send({ "message": "User signed in successfully",data: user });
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    };
}

export default AuthController;
