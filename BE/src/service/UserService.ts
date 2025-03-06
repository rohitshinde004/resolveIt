import User from '../models/User';
import IUser from '../types/IUser';
import UserDTO from '../DTO/UserDTO';

class UserService {
    // Get all users
    public getAllUsers = async (): Promise<UserDTO[]> => {
        const users = await User.find().exec();
        return users.map(user => new UserDTO(user));
    }

    // Update a user by ID
    public updateUser = async (userId: number, userDTO: Partial<UserDTO>): Promise<UserDTO | null> => {
        const user = await User.findByIdAndUpdate(userId, userDTO, { new: true }).exec();
        return user ? new UserDTO(user) : null;
    }

    // Delete a user by ID
    public deleteUser = async (userId: number): Promise<UserDTO | null> => {
        const user = await User.findByIdAndDelete(userId).exec();
        return user ? new UserDTO(user) : null;
    }

    // Get a user by ID
    public getUserById = async (userId: number): Promise<UserDTO | null> => {
        const user = await User.findOne({ id: userId }).exec();
        return user ? new UserDTO(user) : null;
    }
}

export default UserService;
