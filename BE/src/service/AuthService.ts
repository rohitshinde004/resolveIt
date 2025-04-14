import User from '../models/User';
import IUser from '../types/IUser';
import UserDTO from '../DTO/UserDTO';
import UserRole from '../types/UserRole';

class AuthService {
    // Function to sign up a new user
    public signUp = async (userDTO: UserDTO, password: string): Promise<IUser> => {
        const { firstName, lastName, email, address, pincode, phno } = userDTO;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            role: UserRole.Citizen,
            address,
            pincode,
            phno,
            password
        });

        try {
            // Save the user to the database
            await newUser.save();
            return newUser;
        } catch (error: any) {
            throw new Error('Error saving user: ' + error.message);
        }
    }

    // Function to sign in a user
    public signIn = async (email: string, password: string): Promise<IUser | null> => {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        return user;
    }
}

export default AuthService;
