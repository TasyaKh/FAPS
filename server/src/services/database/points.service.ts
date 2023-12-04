import {ConditionsLocalityDto} from "../../classes/conditions_locality";
import AppDataSource from "../../typeorm.config";
import {ConditionsLocality} from "../../entities/conditions_locality.entity";
import {UserService} from "./user.service";
import {User} from "../../entities/user.entity";

export class PointsService {

    async createOrUpdateConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto) {

        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const cLUser = await cLRepo.findOne({where: {user: user}})

        if (cLUser) {
            await this.updateConditionsLocality(cLUser.id, conditionsLocalityDto)
        } else {
            await this.createConditionsLocality(user, conditionsLocalityDto)
        }
    }

    async createConditionsLocality(user: User, conditionsLocalityDto: ConditionsLocalityDto) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const query = cLRepo.create({user: user, ...conditionsLocalityDto})
        return await cLRepo.insert(query)
    }

    async updateConditionsLocality(id: number, conditionsLocalityDto: ConditionsLocalityDto) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        return await cLRepo.update(id, {...conditionsLocalityDto})
    }
}
