import User from '../models/User';
import IUser from '../types/IUser';
import UserDTO from '../DTO/UserDTO';
import UserRole from '../types/UserRole';
import MailService from './MailService'; // Import MailService

class AdminService {

    // Function to create a new admin user
    public createAdmin = async (userDTO: UserDTO): Promise<IUser> => {
        const { firstName, lastName, email, role, address, pincode, phno } = userDTO;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Check if an admin with the same pincode already exists
        const existingUserPincode = await User.findOne({ pincode });
        if (existingUserPincode) {
            throw new Error('Admin with this pincode already exists');
        }

        // Generate a random password
        const generatedPassword = Math.random().toString(36).slice(-8);

        // Create a new user instance
        const newUser = new User({
            firstName,
            lastName,
            email,
            role: UserRole.Admin,
            address,
            pincode,
            phno,
            password: generatedPassword // Save the generated password
        });

        try {
            // Save the user to the database
            await newUser.save();

            // send creds to user if user is created successfully.
            try {
                await MailService.sendMail(
                    email,
                    'Welcome to Admin Portal',
                    `Hello ${firstName},\n\nYour admin account has been created successfully.\nYour temporary password is: ${generatedPassword}\n\nPlease change your password after logging in.\n\nThank you!`
                );
            } catch (error: any) {
                throw new Error('Error sending email: ' + error.message);
            }
            return newUser;

        } catch (error: any) {
            throw new Error('Error saving user: ' + error.message);
        }
    }

    public getAdminByPinCode = async (pincode: number): Promise<IUser> => {
        try {
            const admin = await User.findOne({ pincode: pincode, role: UserRole.Admin });

            if (!admin) {
                throw new Error('Admin not found');
            }

            return admin;
        } catch (error: any) {
            throw new Error('Error fetching admin: ' + error);
        }
    }
}


export default AdminService;