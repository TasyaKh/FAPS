import express, {Router} from 'express'
import {getLocalitiesByDistrictId} from "../../services/location.service.js";
import {Response} from "node-fetch";
import {Distance} from "../../services/findDistanceGraphopper.service";

const router = Router()

// /api/cluster
router.post(
    '/district',
    [],
    async (req: express.Request, res: express.Response) => {

        try {
            const requestBody = req.body;

            const dist = new Distance()
            let localities:any = null

            if(requestBody.district_id){
                localities  = await getLocalitiesByDistrictId(requestBody.district_id)
            }

            // find distance between 2 points in meters
            // for(let i=0;i<100;i++){
            // for(let i=0;i<100;i++){

            let localitiesCoords =[[104.32694, 52.71306]]
            let fapsCoords = [[104.44722, 52.66111]]

                await dist.findDistanceMultipleLocalities(localitiesCoords, fapsCoords)
            // }
            //     await dist.findDist2Points([104.32694, 52.71306], [104.44722, 52.66111])
            // }

            res.json(localities)

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
        //res.json(r)
    }
)

export default router

