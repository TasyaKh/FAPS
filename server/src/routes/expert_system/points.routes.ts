import {Router} from 'express'
import {celebrate, Joi} from "celebrate";
import {RuleEngine} from "../../services/database/rules.service";
import {DistanceService} from "../../services/database/distance.service";
import {ConditionsLocalityDto} from "../../classes/conditions_locality.dto";
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

            // get localities and nearest faps
            const dS = new DistanceService()
            const lMcs = await dS.getLocalitiesAndNearMcs(Number(body.district_id))

            // get conditions from database
            const pointsService = new PointsService()
            // TODO: default user 1
            const existingConditions = await pointsService.getConditionsLocality(1)

            // init rules
            const rE = new RuleEngine()
            if(existingConditions)
                rE.setConditions(existingConditions)
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
                // TODO: default user 1
                const user = await uS.getUser(1)
                await pointsService.createOrUpdateConditionsLocality(user, req.body as ConditionsLocalityDto);
            }catch (err){
                res.status(500).json({message: err})
                console.log(err)
            }
            res.status(200).json({message:"saved"})
        }
    )

    router.get(
        '/conditions-localities',
       [],
        async (req, res) => {
            const pointsService = new PointsService()
            try {
                // TODO: default user 1
               const data =  await pointsService.getConditionsLocality(1);
               return  res.status(200).json(data)
            } catch (err) {
                res.status(500).json({message: err})
                console.log(err)
            }

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

