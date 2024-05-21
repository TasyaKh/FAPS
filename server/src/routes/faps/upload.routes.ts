import {Router} from 'express'
import multer from 'multer'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import fs from 'fs'
import AppDataSource from "../../typeorm.config";
import {checkUserRoleOrErr, verifyUserToken} from "../../services/auth.service";
import {Roles} from "../../roles";

const router = Router()

export default (app: Router) => {
    app.use('/upload', router)
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./client/public/attached/images/")
        },
        filename: (req, file, cb) => {
            //@ts-ignore
            const cyrillicToTranslit = new CyrillicToTranslit();

            const translitFileName = cyrillicToTranslit.transform(file.originalname, '_').toLowerCase();

            let fileName = translitFileName.split('.')
            const exp = fileName.pop()

            const now = new Date()
            let date = '(' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '-' + now.getDay() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + ')'

            fileName = fileName.join() + date + '.' + exp

            cb(null, fileName)
        }
    })

    const fileFilter = (req, file, cb) => {

        if (file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }


    const deleteFile = (filename) => {
        try {
            fs.unlinkSync('./client/public/attached/images/' + filename)
            console.log('Файл удален:', filename)
        } catch (e) {
            console.log('Ошибка удаления файла', e)
        }
    }

// /api/upload/images
    router.post(
        '/images',
        verifyUserToken,
        multer(({storage: storageConfig, fileFilter: fileFilter})).single("filedata"),
        async (req, res) => {
            const granted = checkUserRoleOrErr(req, res, Roles.EXPERT)
            if (granted) {
                try {

                    if (!req.file)
                        res.status(500).json({message: 'Неверный формат файла'})

                    let query: string = 'INSERT INTO `photo` (`id`, `medical_center_id`, `name`) VALUES (?, ?, ?)'
                    const entityManager = AppDataSource.createEntityManager()

                    const result = await entityManager.query(query, [null, req.body.id, req.file.filename]).catch((err) => {
                        deleteFile(req.file.filename)
                        throw err
                    }).then((rows) => {
                        res.status(200).send({
                            message: 'Файл загружен',
                            image: {
                                id: rows.insertId,
                                medical_center_id: parseInt(req.body.id),
                                name: req.file.filename
                            }
                        })
                    })

                } catch (e) {
                    deleteFile(req.file.filename)
                    console.log(e)
                    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
                }
            }
        }
    )

// /api/upload/images/delete
    router.post(
        '/images/delete',
        verifyUserToken,
        async (req, res) => {
            const granted = checkUserRoleOrErr(req, res, Roles.EXPERT)
            if (granted) {
                try {

                    const entityManager = AppDataSource.createEntityManager()

                    let query = 'DELETE FROM `photo` WHERE `photo`.`id` = ?'
                    const result = await entityManager.query(query, [req.body.id])

                    deleteFile(req.body.name)

                    res.status(200).send({
                        message: 'Файл удален'
                    })
                } catch (e) {
                    console.log(e)
                    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
                }
            }
        }
    )
}
