import { User } from "../entities/user.entity";
import { UserDto } from "../dto/user.dto";
export declare class UserService {
    private userRepo;
    getUser(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateUser(id: number, userDto: UserDto): Promise<import("typeorm").UpdateResult>;
    findByPasswordResetToken(token: string): Promise<User>;
}
