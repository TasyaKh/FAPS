import express, {Router} from "express";
import {checkUserRoleOrErr, findUsers, grantRole, verifyUserToken} from "../../services/auth.service";
import {UserDto} from "../../dto/user.dto";
import {Roles} from "../../roles";

const router = Router()
export default (app: Router) => {
    app.use('/user', router)

    router.post(
        '/grant-role',
        verifyUserToken,
        async (req: express.Request, res: express.Response) => {
            checkUserRoleOrErr(req, res, Roles.ADMIN)

            try {
                const dto = req.body as UserDto;

                await grantRole(dto).then(() => {
                    res.status(200).json({message: "Успешно"});
                })

            } catch (err) {
                res.status(400).json(err.message)
            }
        }
    )

    // find users
    router.get(
        '',
        async (req: express.Request, res: express.Response) => {

            try {
                const dto = req.query as UserDto;

                const users = await findUsers(dto)
                 return res.json(users)

            } catch (err) {
                res.status(400).json(err.message)
            }
        }
    )
}

