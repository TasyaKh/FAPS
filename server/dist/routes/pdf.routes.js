var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import ejs from 'ejs';
import path from 'path';
import htmlPdf from 'html-pdf';
import { getParameters } from '../functions/getParameters.js';
const router = Router();
const __dirname = path.resolve();
// /api/reports/pdf
router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date = new Date();
        let month = date.getMonth() + 1;
        month = (month < 10 ? '0' + month : month);
        let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        date = day + '.' + month + '.' + date.getFullYear();
        const receivedData = [];
        if (req.body.data.objects.length > 0) {
            for (const object of req.body.data.objects) {
                receivedData.push(Object.values(object));
            }
        }
        const options = {
            title: req.body.data.title || 'Отчет',
            date: date,
            headers: req.body.data.headers || 'Без заголовков',
            data: receivedData,
            zoom: 1,
            params: yield getParameters(req.body.parameters)
        };
        let pdfOptions = {
            format: 'A4',
            orientation: 'landscape',
            border: '10px',
            height: "210mm",
            width: "297mm"
        };
        if (process.env.NODE_ENV === 'production') {
            pdfOptions.phantomPath = "./node_modules/phantomjs-prebuilt/bin/phantomjs";
            pdfOptions.zoomFactor = 0.7;
            options.zoom = 0.7;
        }
        const fileName = 'report';
        const renderFile = path.resolve(__dirname, 'views', fileName + '.ejs');
        ejs.renderFile(renderFile, options, (err, html) => {
            if (err)
                res.status(500).json({ message: 'Ошибка при рендере .ejs файла ' + err });
            const renderHtml = html.replace(/img src=\//g, 'img src="file://' + __dirname + "/");
            htmlPdf.create(renderHtml, pdfOptions).toBuffer((error, buffer) => {
                if (error) {
                    res.status(500).json({ message: 'Ошибка конвертации ' + error });
                }
                const pdf = buffer.toString('base64');
                res.send(pdf);
            });
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
}));
export default router;
//# sourceMappingURL=pdf.routes.js.map