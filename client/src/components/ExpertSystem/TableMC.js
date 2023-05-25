import React from "react"
import { Table } from "react-materialize"

export const TableMC = ( /** @type {{ data: any[]; }} */ props) => {

   const headers = ["№", "НП", "ПМСП", "СМП", "Взрослое население", "Детское население", 
   "Водоснабжение", "Канализация", "Отопление", "Интернет"]
   
    return (
            <Table>
                <thead>
                    <tr >
                        {props.data && headers.map((obj, i) => (
                            <th
                                key={i}
                            >
                                {obj}
                            </th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.map((obj, i) => (
                        <tr
                            key={i}
                        >
                            <td>{i + 1}</td>
                            {Object.keys(obj).map((el, j) => (
                                <td
                                    key={j}
                                >
                                    {obj[el]}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </Table>
    )
}