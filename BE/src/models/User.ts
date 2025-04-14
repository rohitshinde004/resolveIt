import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import UserRole from '../types/UserRole';
import IUser from '../types/IUser';



const UserSchema: Schema<IUser> = new Schema({
    id: { type: Number, auto: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: UserRole },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    phno: { type: String, required: true },
}, { autoIndex: true });

UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if (user.isNew) {
        const lastUser = await mongoose.model<IUser>('User').findOne().sort({ id: -1 });
        user.id = lastUser ? lastUser.id + 1 : 1001;
    }

    next();
});

// Middleware to hash the password before saving the document
UserSchema.pre<IUser>('save', async function (next) {
    const user = this;

    // Hash the password only if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password using the salt
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Replace the plain text password with the hashed password
        user.password = hashedPassword;

        // Proceed to the next middleware or save the document
        return next();
    } catch (error: any) {
        console.log(error);
        return next(error); // Pass the error to the next middleware
    }
});

// Method to compare a candidate password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    try {
        // Compare the candidate password with the stored hashed password
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error; // Throw error if comparison fails
    }
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;