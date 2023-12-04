import AppDataSource from "../../typeorm.config";
import {User} from "../../entities/user.entity";

export class UserService {
    async getUser(id: number) {
        const userRepo = AppDataSource.getRepository(User)
        return await userRepo.findOne({where:{id: id}})
    }
}