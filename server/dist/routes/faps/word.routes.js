"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const docx_1 = require("docx");
const getParameters_js_1 = require("../../functions/getParameters.js");
const router = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/reports/word', router);
    const getValue = (el) => {
        let value = el || '';
        if (el === null) {
            value = '-';
        }
        else if (parseInt(el) === 1) {
            value = 'Есть';
        }
        else if (parseInt(el) === 0) {
            value = 'Нет';
        }
        return value.toString();
    };
    const getWordDoc = (data) => {
        const getHeader = (headers) => {
            const headerCells = [];
            for (let i = 0; i < headers.length; i++) {
                headerCells.push(new docx_1.TableCell({
                    size: 25,
                    children: [
                        new docx_1.Paragraph({
                            children: [
                                new docx_1.TextRun({
                                    text: headers[i],
                                    bold: true
                                })
                            ],
                        })
                    ]
                }));
            }
            return new docx_1.TableRow({
                children: headerCells,
                tableHeader: true
            });
        };
        const getParams = (params) => {
            const paramsContainer = [];
            for (let i = 0; i < params.length; i++) {
                paramsContainer.push(new docx_1.Paragraph({
                    spacing: {
                        after: i === params.length - 1 ? 500 : 0,
                    },
                    children: [
                        new docx_1.TextRun({
                            text: params[i].name + ': ',
                            bold: true
                        }),
                        new docx_1.TextRun({
                            text: params[i].value
                        })
                    ]
                }));
            }
            return paramsContainer;
        };
        const getTableBody = (rowsData) => {
            const tableBody = [];
            for (let i = 0; i < rowsData.length; i++) {
                const el = rowsData[i];
                const rowCells = [];
                let num = i + 1; // @ts-ignore
                num = num.toString();
                rowCells.push(new docx_1.TableCell({
                    children: [new docx_1.Paragraph(num)],
                }));
                for (let j = 0; j < el.length; j++) {
                    rowCells.push(new docx_1.TableCell({
                        children: [new docx_1.Paragraph(getValue(el[j]))],
                    }));
                }
                tableBody.push(new docx_1.TableRow({
                    children: rowCells
                }));
            }
            return tableBody;
        };
        return new docx_1.Document({
            sections: [{
                    properties: {
                        page: {
                            size: {
                                orientation: docx_1.PageOrientation.LANDSCAPE,
                            },
                            margin: {
                                top: 1000,
                                right: 1000,
                                bottom: 1000,
                                left: 1000,
                            },
                        },
                    },
                    children: [
                        new docx_1.Paragraph({
                            heading: docx_1.HeadingLevel.HEADING_1,
                            children: [
                                new docx_1.TextRun({
                                    text: data.title,
                                    size: 22 * 2,
                                    bold: true
                                })
                            ],
                        }),
                        new docx_1.Paragraph({
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new docx_1.TextRun(`Дата: ${data.date}`)
                            ]
                        }),
                        data.params && data.params.length > 0 ? new docx_1.Paragraph({
                            spacing: {
                                after: 50,
                            },
                            children: [
                                new docx_1.TextRun({
                                    text: 'Параметры поиска:',
                                    size: 12 * 2,
                                    bold: true
                                })
                            ]
                        }) : [],
                        ...getParams(data.params),
                        new docx_1.Table({
                            rows: [
                                getHeader(data.headers),
                                ...getTableBody(data.data)
                            ],
                        })
                    ],
                }],
        });
    };
    // /api/reports/pdf
    router.post('/', [], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let date = new Date();
            let month = date.getMonth() + 1; // @ts-ignore
            month = (month < 10 ? '0' + month : month);
            let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            // @ts-ignore
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
                params: yield (0, getParameters_js_1.getParameters)(req.body.parameters)
            };
            const doc = getWordDoc(options);
            // @ts-ignore
            docx_1.Packer.toBuffer(doc).then((buffer) => {
                res.send(buffer.toString('base64'));
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
        }
    }));
};
//# sourceMappingURL=word.routes.js.map