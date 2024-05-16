import React, {FC, useState} from "react"
import './ETable.scss'
import {ISolutionsMCS} from "types/types";
import {FilterBtn} from "../../Elements/Buttons/BtnFilter/FilterBtn";
import {Order} from "enums";
import {ProgressBar} from "react-materialize";

interface TableMCSProps {
    dataIsLoading: boolean,
    data: ISolutionsMCS[],
    onFilterStateChanged: (orderState: Order, filterName: string, prevFilterName: string) => void,
}

export const TableMCS:
    FC<TableMCSProps> = ({data, onFilterStateChanged, dataIsLoading}) => {

    const columns = [
        {col: 'МП', filterName: "mc_name_order", hasFilter: false},
        {col: 'Взрослое насел.', filterName: "mc_population_adult_order", hasFilter: true},
        {col: 'Детское насел.', filterName: "mc_population_child_order", hasFilter: true},
        {col: 'Год', filterName: "foundation_year_order", hasFilter: true},
        {col: 'Медик', filterName: "mc_staffing_order", hasFilter: true},
        {col: 'Состояние', filterName: "state_order", hasFilter: false},
        {col: 'Сумма', filterName: "sum_order", hasFilter: true},
    ]

    const [selectedFilter, setSelectedFilter] = useState({
        filterName: columns[0].filterName,
        state: Order.DEFAULT,
    })

    const handleFilterStateChanged = (orderState: Order, filterName: string) => {
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
                                <div style={{display: "inline-block"}}> {el.col}</div>
                                <div style={{display: "inline-block"}}>
                                    {el.hasFilter ?
                                        <FilterBtn name={el.filterName} onStateChanged={handleFilterStateChanged}
                                                   stateDefault={el.filterName == selectedFilter.filterName ? selectedFilter.state : Order.DEFAULT}/>
                                        : null}
                                </div>
                            </div>
                        </th>
                    ))}
                </tr>
                </thead>

                <tbody>
                {data && data.map((dataEl, i) => (
                    <tr className='table-view__row' key={i}>
                        <td>{dataEl.mc.name} </td>
                        <td>
                            <div className={'colored center'}>({dataEl.adult_population ?? '-'})</div>
                            <div className={'center'}>{dataEl.mc.locality?.population?.population_adult ?? '-'} </div>
                        </td>
                        <td>
                            <div className={'colored center'}>({dataEl.child_population ?? '-'})</div>
                            <div className={'center'}>{dataEl.mc.locality?.population?.population_child}</div>
                        </td>
                        <td>
                            <div className={'colored center'}>({dataEl.foundation_year ?? '-'})</div>
                            <div className={'center'}>{dataEl.mc.founding_year ?? '-'}</div>
                        </td>
                        <td>
                            <div className={'colored center'}>({dataEl.staffing ?? '-'})</div>
                            <div className={'center'}>{dataEl.mc.staffing ?? '-'}</div>
                        </td>
                        <td>
                            <div className={'colored center'}>({dataEl.state ?? '-'})</div>
                            <div className={'center'}> {dataEl.mc.building_condition?.state ?? '-'}</div>
                        </td>
                        <td>
                            <div className={'colored center'}><b>{dataEl.sum}</b></div>
                        </td>
                    </tr>
                ))
                }

                </tbody>
            </table>

            {dataIsLoading && <ProgressBar/>}
        </div>
    )
}
