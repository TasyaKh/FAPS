import React, {FC} from "react"
import '../FAPS/TableView.scss'
import {ICustomSolutionsLocalities} from "../../entities/entities";

interface TableSolutionsProps {
    data: ICustomSolutionsLocalities[]
}

export const TableSolutions:
    FC<TableSolutionsProps> = ({data}) => {

    const columns = [
        {col: 'НП'}, {col: 'Взрослое население'}, {col: 'Детское население'}, {col: 'МП',}, {col: 'Медик'},
        {col: 'тип МП'}, {col: 'МП, км'}, {col: 'МП, время'}, {col: 'Результат'},
    ]

    return (

        <table className="highlight table-view">
            <thead>
            <tr>
                {columns.map((el, i) => (
                    <th key={i} className="table-view__header">{el.col}</th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data ? data.map((dataEl, i) => (
                <tr  className='table-view__row' key={i}>
                    <td>{dataEl.data?.locality_name}</td>
                    <td>{dataEl.data?.population_population_adult}</td>
                    <td>-</td>
                    <td>{dataEl.data?.medical_center_name}</td>
                    <td>{dataEl.data?.mc_staffing ? (dataEl.data?.mc_staffing > 0 ? 'да' : 'нет') : '-'}</td>
                    <td>{dataEl.data?.mc_type_name ?? '-'}</td>
                    <td>{dataEl.data?.min_distance ? (dataEl.data?.min_distance / 1000).toFixed(2) : '-'}</td>
                    <td>{dataEl.data?.min_duration ? (dataEl.data.min_duration / 1000).toFixed(2) : '-'}</td>

                    <td>{dataEl.solutions && dataEl.solutions?.length > 0 ? dataEl.solutions.join(', \n') : '-'}</td>
                </tr>
            )) : null}
            </tbody>
        </table>
    )
}