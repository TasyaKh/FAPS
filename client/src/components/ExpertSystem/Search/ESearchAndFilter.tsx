import React, {FC} from 'react'
import {CardPanel} from "react-materialize";
import './ESearchAndFilter.scss'
import {ESearchFilter} from "./ESearchFilter";
import {IFilterEMap} from "../../../pages/ExpertSystem/EMapPage";
import {ESearch} from "../../Elements/Search/ESearch";

interface ESearchProps {
    scroll: boolean,
    handleInput: (e: any) => void
    handleFilter: (e: any) => void
    filterShow: boolean
    onFilterChanged: (changed: IFilterEMap) => void
    filters: IFilterEMap,
}

export const ESearchAndFilter:
    FC<ESearchProps> = ({
                            scroll,
                            handleInput,
                            handleFilter,
                            filterShow,
                            onFilterChanged,
                            filters,
                        }) => {

    return (
        <CardPanel className={scroll ? "sidebar__header" : "sidebar__header sidebar__header--fixed"}>
            <ESearch handleInput={handleInput}
                     childButton={
                         <button
                             className="sidebar__button sidebar__button--filter"
                             onClick={handleFilter}
                         >
                             <img src='/img/filter.svg' alt='back'/>
                         </button>
                     }/>

            <ESearchFilter
                isVisible={filterShow}
                onFilterChanged={onFilterChanged}
                filters={filters}
            />

        </CardPanel>
    )
}
