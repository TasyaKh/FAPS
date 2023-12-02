import express, {NextFunction, Router} from 'express'
import {DistanceService} from "../../services/database/distance.service";
import DistanceC from "../../classes/distanceC";

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
                const dist = new DistanceC()
                dist.locality_id = requestBody.locality_id

                let distances = await distService.getDistToMc(res, dist)
                res.json(distances)

            } catch (error) {
                res.status(500).json({error: 'Internal server error'});
            }
        }
    )


// /api/distance/localities-nearest-faps
    router.post(
        '/localities-nearest-faps',
        [],
        async (req, res) => {

            const dS = new DistanceService()
            const lMc = await  dS.getLocalitiesAndNearMcs(req.body.district_id)
            return res.json(lMc)
        }
    )
}
