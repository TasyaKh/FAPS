import {Router} from 'express'
import {HeadingLevel, Packer, PageOrientation, Paragraph, Table, TableCell, TableRow, TextRun} from "docx"
import {getParameters} from '../../functions/getParameters.js'

const router = Router()
export default (app: Router) => {
  app.use('/reports/word', router)
  const getValue = (el) => {
    let value = el || ''

    if (el === null) {
      value = '-'
    } else if (parseInt(el) === 1) {
      value = 'Есть'
    } else if (parseInt(el) === 0) {
      value = 'Нет'
    }

    return value.toString()
  }

  const getWordDoc = (data) => {

    const getHeader = (headers) => {
      const headerCells = []

      for (let i = 0; i < headers.length; i++) {
        headerCells.push(new TableCell({    // @ts-ignore
          size: 25,
          children: [

            new Paragraph({
              children: [
                new TextRun({
                  text: headers[i],
                  bold: true
                })
              ],
            })

          ]
        }))
      }

      return new TableRow({
        children: headerCells,
        tableHeader: true
      })
    }

    const getParams = (params) => {
      const paramsContainer = []

      for (let i = 0; i < params.length; i++) {
        paramsContainer.push(new Paragraph({
          spacing: {
            after: i === params.length - 1 ? 500 : 0,
          },
          children: [
            new TextRun({
              text: params[i].name + ': ',
              bold: true
            }),
            new TextRun({
              text: params[i].value
            })
          ]
        }))
      }

      return paramsContainer
    }

    const getTableBody = (rowsData) => {
      const tableBody = []

      for (let i = 0; i < rowsData.length; i++) {
        const el = rowsData[i]
        const rowCells = []

        let num = i + 1    // @ts-ignore
        num = num.toString()

        rowCells.push(new TableCell({    // @ts-ignore
          children: [new Paragraph(num)],
        }))

        for (let j = 0; j < el.length; j++) {
          rowCells.push(new TableCell({
            children: [new Paragraph(getValue(el[j]))],
          }))
        }

        tableBody.push(new TableRow({
          children: rowCells
        }))
      }

      return tableBody
    }
    // @ts-ignore
    return new Document({
      sections: [{
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
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

          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: data.title,
                size: 22 * 2,
                bold: true
              })
            ],
          }),

          new Paragraph({
            spacing: {
              after: 200,
            },
            children: [
              new TextRun(`Дата: ${data.date}`)
            ]
          }),

          data.params && data.params.length > 0 ? new Paragraph({
            spacing: {
              after: 50,
            },
            children: [
              new TextRun({
                text: 'Параметры поиска:',
                size: 12 * 2,
                bold: true
              })
            ]
          }) : [],

          ...getParams(data.params),

          new Table({
            rows: [
              getHeader(data.headers),
              ...getTableBody(data.data)
            ],
          })

        ],
      }],
    })
  }

// /api/reports/pdf
  router.post(
      '/',
      [],
      async (req, res) => {
        try {
          let date = new Date();
          let month = date.getMonth() + 1;    // @ts-ignore
          month = (month < 10 ? '0' + month : month);
          let day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
          // @ts-ignore
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
            params: await getParameters(req.body.parameters)
          }

          const doc = getWordDoc(options)
          // @ts-ignore
          Packer.toBuffer(doc).then((buffer) => {
            res.send(buffer.toString('base64'))
          });

        } catch (e) {
          console.log(e)
          res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
      }
  )

}