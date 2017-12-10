import { User } from './user';

export class UserResponseModel {
    public success: boolean;
    public message: string;
    public user: User;
}