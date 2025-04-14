import IUser from '../types/IUser';

class UserDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    address: string;
    pincode: number;
    phno: string;

    constructor(user: IUser) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.role = user.role;
        this.address = user.address;
        this.pincode = user.pincode;
        this.phno = user.phno;
    }
}

export default UserDTO;

