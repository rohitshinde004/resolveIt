import { Document } from "mongoose";
import UserRole from "./UserRole";

interface IUser extends Document {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    address: string;
    pincode: string;
    phno: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export default IUser;