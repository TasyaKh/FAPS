import {User} from "../../entities/user.entity";
import bcrypt from "bcrypt";
import AppDataSource from "../../typeorm.config";
import jwt from "jsonwebtoken";
import config from "config";
import {roleHierarchy, Roles} from "../../roles";
import express from "express";

export const signup = async (newUser: { password: string; name: string, email: string }) => {

    if (newUser.name?.length >= 3 && newUser.password?.length >= 6) {
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(newUser.password, salt);

        // Create user object
        let user = new User()

        user.name = newUser.name
        user.password = hasPassword
        user.email = newUser.email

        const userRepository = AppDataSource.getRepository(User);
        // check username
        const existingUserByName = await userRepository.findOne({where: {name: user.name}})
        if (existingUserByName) throw new Error("Имя пользователя уже занято")

        // check email
        const existingUserByEmail = await userRepository.findOne({where: {email: user.email}})
        if (existingUserByEmail) throw new Error("Email уже занят")

        const createdUser = await userRepository.save({...user, role_name: Roles.USER})

        let payload = {id: createdUser.id, name: createdUser.name, role: createdUser.role_name};
        return jwt.sign(payload, config.get('secret'))
    } else throw new Error("Длина пароля должна быть > 5 и имя пользователя > 2 символов")
}

export const login = async (findUser: { nameEmail?: string, password: string; }) => {

    const userRepository = AppDataSource.getRepository(User);
    let existingUser: User = null;
    if (findUser.nameEmail) existingUser = await userRepository.findOne({
        where: [
            {name: findUser.nameEmail},
            {email: findUser.nameEmail},
        ],
    })

    let validPass = false
    if (existingUser)
        validPass = await bcrypt.compare(findUser.password, existingUser?.password);

    if (!validPass) {
        throw new Error("Имя/Email или пароль неверны")
    }

    // Set token expiration time to 1 *24 hour (you can adjust this as needed)
    const expiresIn = 60 * 60 * 24;

    // Create and assign token
    let payload = {id: existingUser?.id, name: existingUser?.name, role: existingUser?.role_name};
    return jwt.sign(payload, config.get('secret'), {expiresIn})
}

export const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Access Denied / Unauthorized request");

    try {
        // token = token.split(' ')[1] // Remove Bearer from string

        // if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let verifiedUser = jwt.verify(token, config.get('secret'));   // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}


export const getUser = async (id: number) => {
    const userRepository = AppDataSource.getRepository(User);

    return await userRepository.findOne({where: {id: id}})
}

export const checkUserRoleOrErr = (req: express.Request, res: express.Response, requiredRole: Roles) => {
    console.log(req.user)
    const userRole = req.user.role
    if (userRole === requiredRole || roleHierarchy[userRole]?.includes(requiredRole)) {
        return true
    } else res.status(403).send("У вас нет доступа - " + requiredRole);
}
