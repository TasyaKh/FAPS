import express, {NextFunction, Router} from 'express'
import {DistanceService} from "../../services/database/distance.service";
import DistanceDto from "../../classes/distance.dto";
import {celebrate, Joi} from "celebrate";

const router = Router()
export default (app: Router) => {
    app.use('/distance', router)
// /api/distance/mc
    router.post(
        '/mc',
        [],
        async (req: express.Request, res: express.Response,  next: NextFunction) => {

            const distService = new DistanceService()

            try {
                const requestBody = req.body;
                const dist = new DistanceDto()
                dist.locality_id = requestBody.locality_id

                let distances = await distService.getDistToMc(res, dist)
                res.json(distances)

            } catch (error) {
                res.status(500).json({error: 'Internal server error'});
            }
        }
    )


// /api/distance/localities-nearest-faps
    router.get(
        '/localities-nearest-faps',
        celebrate({
            params: Joi.object({
                district_id: Joi.number(),
            }),
        }),
        async (req, res) => {

            const params = req.query
            const dS = new DistanceService()
            const lMc = await  dS.getLocalitiesAndNearMcs(Number(params.district_id))
            return res.json(lMc)
        }
    )
}
