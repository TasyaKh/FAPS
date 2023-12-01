import express, {Router} from 'express'
import {DistanceService} from "../../services/database/distance.service.js";
import Distance from "../../classes/distance.js";

const router = Router()

// /api/distance/mc
router.post(
    '/mc',
    [],
    async (req: express.Request, res: express.Response) => {

        const distService = new DistanceService()

        try {
            const requestBody = req.body;
            const dist = new Distance()
            dist.locality_id = requestBody.locality_id

            let distances = await distService.getDistToMc(dist)
            res.json(distances)

        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    }
)

export default router

