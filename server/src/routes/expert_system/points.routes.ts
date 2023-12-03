import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {RuleEngine} from "../../services/database/rules.service";
import {DistanceService} from "../../services/database/distance.service";

const router = Router()

export default (app: Router) => {
    app.use('/points', router)
// /api/points
    router.get(
        '/assessment-localities',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {
            const body = req.body
            // const condLocRepo = AppDataSource.getRepository(ConditionsLocality)
            // condLocRepo.createQueryBuilder('conditions_locality')
            const dS = new DistanceService()
            const lMcs = await dS.getLocalitiesAndNearMcs(body.district_id)

            const rE = new RuleEngine()
            rE.initializeRules()
            const result = []
            if (lMcs)
                for (let i = 0; i < lMcs.length; i++) {
                    const el = lMcs[i]
                    rE.facts = {
                        populationMC: el.mc_population_population_adult,
                        populationNP:el.population_population_adult,
                        staffComposition: el.mc_staffing,
                        facilityType: el.mc_type_name,
                        distanceMc:el.min_distance / 1000 // convert to km
                    }
                    const reEvents = await rE.runEngine()
                    result.push({el, enents: reEvents})
                }

            res.json(result)
        }
    )

// getPointsLocalitiesOfDistrict
    router.post(
        '/localities',
        [],
        async (req, res) => {
            //
            // const r = await getPointsLocalitiesOfDistrict(req, res)
            // res.json(r)
        }
    )

//getPointsMedicalCentersOfDistrict
    router.post(
        '/medical-centers',
        [],
        async (req, res) => {
            // const r = await getPointsMedicalCentersOfDistrict(req, res)
            // res.json(r)
        }
    )


}

