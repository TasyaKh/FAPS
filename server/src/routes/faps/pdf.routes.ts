// @ts-nocheck
import {Router} from 'express'
import ejs from 'ejs'
import path from 'path'
import htmlPdf from 'html-pdf'
import {getParameters} from "../../functions/getParameters";

const router = Router()
export default (app: Router) => {
    app.use('/reports/pdf', router)
// /api/reports/pdf
    router.post(
        '/',
        [],
        async (req, res) => {
            try {
                let date = new Date();
                let month = date.getMonth() + 1;
                month = (month < 10 ? '0' + month : month);
                let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
                date = day + '.' + month + '.' + date.getFullYear();

                const receivedData = []

                if (req.body.data.objects.length > 0) {
                    for (const object of req.body.data.objects) {
                        receivedData.push(Object.values(object))
                    }
                }

                const options = {
                    title: req.body.data.title || 'Отчет',
                    date: date,
                    headers: req.body.data.headers || 'Без заголовков',
                    data: receivedData,
                    zoom: 1,
                    params: await getParameters(req.body.parameters)
                }

                let pdfOptions = {
                    format: 'A4',
                    orientation: 'landscape',
                    border: '10px',
                    height: "210mm",
                    width: "297mm"
                }

                if (process.env.NODE_ENV === 'production') {
                    pdfOptions.phantomPath = "./node_modules/phantomjs-prebuilt/bin/phantomjs"

                    pdfOptions.zoomFactor = 0.7
                    options.zoom = 0.7
                }

                const fileName = 'report'
                const renderFile = path.resolve(__dirname, 'views', fileName + '.ejs')

                ejs.renderFile(renderFile, options, (err, html:?string) => {

                    if (err)
                        res.status(500).json({message: 'Ошибка при рендере .ejs файла ' + err})

                    const renderHtml = html?.replace(/img src=\//g, 'img src="file://' + __dirname + "/")
                    htmlPdf.create(renderHtml, pdfOptions).toBuffer((error, buffer) => {
                        if (error) {
                            res.status(500).json({message: 'Ошибка конвертации ' + error})
                        }

                        const pdf = buffer.toString('base64')
                        res.send(pdf)
                    })
                })

            } catch (e) {
                console.log(e)
                res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
            }
        }
    )

}