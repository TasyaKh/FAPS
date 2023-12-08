import {ConditionsLocalityDto} from "../../classes/conditions_locality.dto";
import AppDataSource from "../../typeorm.config";
import {ConditionsLocality} from "../../entities/conditions_locality.entity";
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

    async getConditionsLocality(userId: number) {
        const cLRepo = AppDataSource.getRepository(ConditionsLocality)
        const query = cLRepo.createQueryBuilder("conditions_locality")
            .where("conditions_locality.user_id = :user_id", {user_id: userId});
        return await query.getOne()
    }
}
