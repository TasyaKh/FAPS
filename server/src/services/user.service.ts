import AppDataSource from "../typeorm.config";
import {User} from "../entities/user.entity";
import {UserDto} from "../dto/user.dto";

export class UserService {
    private userRepo = AppDataSource.getRepository(User)

    async getUser(id: number) {

        return await this.userRepo.findOne({where: {id: id}})
    }

    async findByEmail(email: string) {

        return this.userRepo.findOne({where: {email: email}})
    }

    async updateUser(id: number, userDto: UserDto) {
        const userRepo = AppDataSource.getRepository(User)

        return userRepo.update(id, userDto)
    }

    async findByPasswordResetToken(token: string) {
        return this.userRepo.findOne({
            where: { forgot_password_token: token },
        });
    }
}
