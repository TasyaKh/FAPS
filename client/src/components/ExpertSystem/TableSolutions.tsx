import React, {FC, useState} from "react"
import './ETable.scss'
import {ICustomSolutionsLocalities} from "../../entities/entities";
import {FilterBtn} from "../Elements/Buttons/BtnFilter/FilterBtn";
import {Order} from "../../enums";
import {ProgressBar} from "react-materialize";

interface TableSolutionsProps {
    dataIsLoading: boolean,
    data: ICustomSolutionsLocalities[],
    onFilterStateChanged: (orderState: Order, filterName: string, prevFilterName: string) => void,
}

export const TableSolutions:
    FC<TableSolutionsProps> = ({data, onFilterStateChanged, dataIsLoading}) => {

    const columns = [
        {col: 'НП', filterName: "locality_name_order", hasFilter: true},
        {col: 'Взрослое насел.', filterName: "population_population_adult_order", hasFilter: true},
        {col: 'Детское насел.', filterName: "population_population_child_order", hasFilter: false},
        {col: 'МП', filterName: "medical_center_name_order", hasFilter: true},
        {col: 'Медик', filterName: "mc_staffing_order", hasFilter: true},
        {col: 'Тип МП', filterName: "mc_type_name_order", hasFilter: true},
        {col: 'МП, км', filterName: "min_distance_order", hasFilter: true},
        {col: 'МП, время', filterName: "min_duration_order", hasFilter: true}, {
            col: 'Результат (Рекомендации)',
            filterName: "locality_name_order",
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
        setSelectedFilter({state: orderState, filterName: filterName})
        onFilterStateChanged(orderState, filterName, prevFilterName)
    }

    return (
        <div className={"my-4"}>
            <table className="highlight scrollable-table">
                <thead>
                <tr>
                    {columns.map((el, i) => (
                        <th key={i} className="table-view__header" style={{alignItems: "end"}}>
                            <div className={"row"}>
                                <div style={{display:"inline-block"}}> {el.col}</div>
                                <div style={{display:"inline-block"}}>
                                    {el.hasFilter ?
                                        <FilterBtn name={el.filterName} onStateChanged={handleFilterStateChanged}
                                                   stateDefault={el.filterName == selectedFilter.filterName ? selectedFilter.state : Order.DEFAULT}/>
                                        : null}
                                    {/*{el.filterName  +  " " +  selectedFilter.filterName } state {el.filterName === selectedFilter.filterName ? selectedFilter.state : Order.DEFAULT}*/}
                                </div>
                            </div>


                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {data ? data.map((dataEl, i) => (
                    <tr className='table-view__row ' key={i}>
                        <td>{dataEl.data?.locality_name} </td>
                        <td>{dataEl.data?.population_population_adult}</td>
                        <td>{dataEl.data?.population_population_child}</td>
                        <td>{dataEl.data?.medical_center_name}</td>
                        <td>{dataEl.data?.mc_staffing ? (dataEl.data?.mc_staffing > 0 ? 'да' : 'нет') : '-'}</td>
                        <td>{dataEl.data?.mc_type_name ?? '-'}</td>
                        <td>{dataEl.data?.min_distance ? (dataEl.data?.min_distance / 1000).toFixed(2) : '-'}</td>
                        <td>{dataEl.data?.min_duration ? (dataEl.data.min_duration / 1000).toFixed(2) : '-'}</td>

                        <td>{dataEl.solutions && dataEl.solutions?.length > 0 ? dataEl.solutions.join(', \n') : '-'}</td>
                    </tr>
                )) : null
                }

                </tbody>
            </table>

            {dataIsLoading ? <ProgressBar/> : null}
        </div>
    )
}