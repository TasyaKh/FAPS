import React, { useMemo } from "react"
import { Table } from "react-materialize"
import '../TableView.scss'

// export const TableMC = ( /** @type {{ data: any[]; }} */ props) => {

//    const headers = ["№", "НП", "ПМСП", "СМП", "Взрослое население", "Детское население", 
//    "Водоснабжение", "Канализация", "Отопление", "Интернет", "Итог"]

//     return (
//             <Table  className="table-view">
//                 <thead>
//                     <tr >
//                         {headers.map((obj, i) => (
//                             <th
//                                 key={i}
//                                 className="table-view__header"
//                             >
//                                 {obj}
//                             </th>
//                         ))}

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {props.data && props.data.map((obj, i) => (
//                         <tr
//                             key={i}
//                             className='table-view__row'
//                         >
//                             <td>{i + 1}</td>
//                             {Object.keys(obj).map((el, j) => (
//                                 <td
//                                     key={j}
//                                     data-label={headers[j+1]??""}
//                                 >
//                                     {obj[el]}
//                                 </td>
//                             ))}

//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>


//     )
// }

// src/components/sorting.table.js


import { useTable, useSortBy } from 'react-table'
import { columnsPointsLocalities, columnsPointsMedicalCenters } from "./ColumnsTables"

function TableL({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    // Render the UI for your table
    return (
        <div>
            <Table className="table-view" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th className="table-view__header"
                                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr className='table-view__row'
                                    {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td data-label={cell.column.Header}
                                                {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </Table>
            <br />
            <div>Число строк: {rows.length} </div>
        </div >
    )
}

export function TableMC(props) {



    const columns = useMemo(() => {
        if (props.isFaps) {
            return [
                columnsPointsMedicalCenters
            ];
        } else {
            return [
              columnsPointsLocalities
            ];
        }
    }, [props.isFaps]);


    return (
        <TableL columns={columns} data={props.data} />
    )
}