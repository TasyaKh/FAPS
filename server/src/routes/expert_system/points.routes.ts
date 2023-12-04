import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {RuleEngine} from "../../services/database/rules.service";
import {DistanceService} from "../../services/database/distance.service";
import {ConditionsLocalityDto} from "../../classes/conditions_locality";
import {PointsService} from "../../services/database/points.service";
import {UserService} from "../../services/database/user.service";

const router = Router()

export default (app: Router) => {
    app.use('/points', router)
// /api/points
    router.get(
        '/solutions-localities',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const body = req.query
            // const condLocRepo = AppDataSource.getRepository(ConditionsLocality)
            // condLocRepo.createQueryBuilder('conditions_locality')
            const dS = new DistanceService()
            const lMcs = await dS.getLocalitiesAndNearMcs(Number(body.district_id))

            const rE = new RuleEngine()
            rE.initializeRules()
            const result = []
            if (lMcs)
                for (let i = 0; i < lMcs.length; i++) {
                    const el = lMcs[i]
                    rE.facts = {
                        populationMC: el.mc_population_population_adult,
                        populationNP: el.population_population_adult,
                        staffComposition: el.mc_staffing,
                        facilityType: el.mc_type_name,
                        distanceMc: el.min_distance / 1000 // convert to km
                    }
                    const reEvents = await rE.runEngine()
                    result.push({data: el, solutions: reEvents})
                }

            res.json(result)
        }
    )

    router.post(
        '/conditions-localities',
        celebrate({
            params: Joi.object({
                min_dist_mc: Joi.number(),
                population_FAP: Joi.number(),
                population_Ambulatory: Joi.number(),
            }),
        }),
        async (req, res) => {
            const pointsService = new PointsService()
            try {
                const uS = new UserService()
                const user = await uS.getUser(1)
                await pointsService.createOrUpdateConditionsLocality(user, req.body as ConditionsLocalityDto);
            }catch (err){
                res.status(500).json({message: err})
            }
            res.status(200)
        }
    )

// getPointsLocalitiesOfDistrict
//     router.post(
//         '/localities',
//         [],
//         async (req, res) => {
//             //
//             // const r = await getPointsLocalitiesOfDistrict(req, res)
//             // res.json(r)
//         }
//     )

//getPointsMedicalCentersOfDistrict
//     router.post(
//         '/medical-centers',
//         [],
//         async (req, res) => {
//             // const r = await getPointsMedicalCentersOfDistrict(req, res)
//             // res.json(r)
//         }
//     )


}

