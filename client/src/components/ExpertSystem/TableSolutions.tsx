import React, {FC, useState} from "react"
import '../FAPS/TableView.scss'
import {ICustomSolutionsLocalities} from "../../entities/entities";
import {FilterBtn} from "../Elements/Buttons/BtnFilter/FilterBtn";
import {Order} from "../../enums";

interface TableSolutionsProps {
    data: ICustomSolutionsLocalities[],
    onFilterStateChanged: (orderState: Order, filterName: string, prevFilterName:string) => void,
}

export const TableSolutions:
    FC<TableSolutionsProps> = ({data, onFilterStateChanged}) => {

    const columns = [
        {col: 'НП', filterName: "locality_name", hasFilter: true},
        {col: 'Взрослое население', filterName: "population_population_adult", hasFilter: true},
        {col: 'Детское население', filterName: "population_population_child", hasFilter: false},
        {col: 'МП', filterName: "medical_center_name", hasFilter: true},
        {col: 'Медик', filterName: "mc_staffing", hasFilter: true},
        {col: 'тип МП', filterName: "mc_type_name", hasFilter: true},
        {col: 'МП, км', filterName: "min_distance", hasFilter: true},
        {col: 'МП, время', filterName: "min_duration", hasFilter: true}, {
            col: 'Результат',
            filterName: "locality_name",
            hasFilter: false
        },
    ]

    const [selectedFilter, setSelectedFilter] = useState({
        filterName: columns[0].filterName,
        state: Order.DEFAULT,
    })

    const handleFilterStateChanged = (orderState: Order, filterName: string) => {
        // alert("state new" + orderState + " " + filterName)

        const prevFilterName = selectedFilter.filterName
        // set filter
        setSelectedFilter({ state: orderState, filterName: filterName})
        onFilterStateChanged(orderState, filterName, prevFilterName)
    }

    return (

        <table className="highlight table-view">
            <thead>
            <tr>
                {columns.map((el, i) => (
                    <th key={i} className="table-view__header">{el.col}
                        {el.hasFilter ?
                            <FilterBtn name={el.filterName} onStateChanged={handleFilterStateChanged}
                                       stateDefault={el.filterName == selectedFilter.filterName ? selectedFilter.state : Order.DEFAULT}/>
                            : null}
                  {/*{el.filterName  +  " " +  selectedFilter.filterName } state {el.filterName === selectedFilter.filterName ? selectedFilter.state : Order.DEFAULT}*/}
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {data ? data.map((dataEl, i) => (
                <tr className='table-view__row ' key={i}>
                    <td data-label={columns[i]}>{dataEl.data?.locality_name} </td>
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