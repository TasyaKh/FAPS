import express, {Router} from 'express'
import {login, signup} from "../services/database/auth.service";

const router = Router()
export default (app: Router) => {
    app.use('/auth', router)
// /api/cluster get distances from openrouteservice
    router.post(
        '/sign-up',
        [],
        async (req: express.Request, res: express.Response) => {
            try {
                const { name, email, password } = req.body;
                const token = await signup({ name:name, email:email, password:password })
                if(token)
                    res.status(200).json({message:"Сохранено"})
                else res.status(200).json("Что то пошло не так при создании")
            }catch (err){
                console.log(err)
                res.status(400).json(err.message)
            }
        }
    )

    router.post(
        '/login',
        [],
        async (req: express.Request, res: express.Response) => {
            try {
                const { nameEmail, password } = req.body;
                const token = await login({nameEmail: nameEmail, password: password})

                if(token)
                    res.status(200).header("Authorization", token).send({ "token": token });
                else  res.status(401).send('Что-то пошло не так')
            }catch (err){
                res.status(401).json(err.message)
            }
        }
    )

}

