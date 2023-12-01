import express, {Router} from 'express'

const router = Router()

export default (app: Router) => {
    app.use('/cluster', router)
// /api/cluster
    router.post(
        '/district',
        [],
        async (req: express.Request, res: express.Response) => {
            // await updateLocalityLongLatGeoportalByName()
        }
    )
}

