import express, {Router} from 'express'
import {forgotPassword, getUser, login, resetPassword, signup, verifyUserToken} from "../services/auth.service";

const router = Router()
export default (app: Router) => {
    app.use('/auth', router)

    router.get(
        '/',
        verifyUserToken,
        async (req: express.Request, res: express.Response) => {
            let user = null
            try {
                const userId = req.user.id
                user = await getUser(userId)
            } catch (err) {
                res.status(400).json(err.message)
            }
            res.status(200).json(user)
        }
    )

    router.post(
        '/sign-up',
        [],
        async (req: express.Request, res: express.Response) => {
            try {
                const {name, email, password} = req.body;
                const token = await signup({name: name, email: email, password: password})
                if (token)
                    res.status(200).json({message: "Сохранено"})
                else res.status(200).json("Что то пошло не так при создании")
            } catch (err) {
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
                const {nameEmail, password} = req.body;
                const token = await login({nameEmail: nameEmail, password: password})

                if (token)
                    res.status(200).header("Authorization", token).send({"token": token});
                else res.status(401).send('Что-то пошло не так')
            } catch (err) {
                res.status(400).json(err.message)
            }
        }
    )

    router.post(
        '/forgot-password',
        [],
        async (req: express.Request, res: express.Response) => {
            try {
                const {email} = req.body;

                await forgotPassword(email).then(() => {
                    res.status(200).json({message: "Отправлено"});
                })
            } catch (err) {
                res.status(400).json(err.message)
            }
        }
    )

    router.post(
        '/reset-password',
        [],
        async (req: express.Request, res: express.Response) => {
            try {
                const {forgot_password_token, password} = req.body;

                await resetPassword(forgot_password_token, password).then(() => {
                    res.status(200).json({message: "Успешно"});
                })

            } catch (err) {
                res.status(400).json(err.message)
            }
        }
    )

}

