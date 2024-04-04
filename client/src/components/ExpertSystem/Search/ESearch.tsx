import React, {FC} from 'react'
import {CardPanel, TextInput} from "react-materialize";
import './ESearch.scss'
import {ESearchFilter} from "./ESearchFilter";
import {IFilterEMap} from "../../../pages/ExpertSystem/EMapPage";

interface ESearchProps {
    scroll: boolean,
    handleInput: (e:any) => void
    handleFilter: (e:any) => void
    filterShow: boolean
    onFilterChanged: (changed: IFilterEMap) => void
    filters: IFilterEMap,
}

export const ESearch: FC<ESearchProps> = ({
                                              scroll,
                                              handleInput,
                                              handleFilter,
                                              filterShow,
                                              onFilterChanged,
                                              filters,
                                          }) => {

    return (
        <CardPanel className={scroll ? "sidebar__header" : "sidebar__header sidebar__header--fixed"}>
            <div className="sidebar__search">

                <TextInput
                    id="sidebar-input"
                    inputClassName="sidebar__text-input"
                    placeholder="Поиск"
                    onChange={handleInput}
                />

            </div>

            <div className="sidebar__controls">

                <button
                    className="sidebar__button sidebar__button--search"
                >
                    <img src='/img/magnifier.svg' alt="Поиск"/>
                </button>

                <button
                    className="sidebar__button sidebar__button--filter"
                    onClick={handleFilter}
                >
                    <img src='/img/filter.svg' alt='back'/>
                </button>
            </div>

            <ESearchFilter
                isVisible={filterShow}
                onFilterChanged={onFilterChanged}
                filters={filters}
            />

        </CardPanel>
    )
}
