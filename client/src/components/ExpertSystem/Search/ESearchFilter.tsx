import React, {FC, useEffect} from 'react'
import './ESearchFilter.scss'
import {CardPanel, Checkbox} from "react-materialize"
import {useHttp} from "../../../hooks/http.hook";
import {SelectArea} from "../../FAPS/SelectArea";
import {IFilterEMap} from "../../../pages/ExpertSystem/EMapPage";

interface ESearchFilterProps {
    onFilterChanged: (changed: IFilterEMap) => void,
    filters: IFilterEMap,
    isVisible: boolean,
}

export const ESearchFilter: FC<ESearchFilterProps> = ({
                                                          onFilterChanged,
                                                          filters,
                                                          isVisible
                                                      }) => {
    const {loading, error, request, clearError} = useHttp()


    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])

    const handleSelectChange = (e: any) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        onFilterChanged({...filters, [name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleCheckBoxFilterClick = (e: any) => {
        const {target} = e
        const {value, checked} = target
        if (target.value === 'faps')
            onFilterChanged({...filters, showFaps: checked})
        else if (target.value === 'settlements')
            onFilterChanged({...filters, showSettlements: checked})
    }

    return (

        <CardPanel
            className={`search-filter white ${(isVisible ? 'search-filter--visible' : 'search-filter--hidden')}`}>
            <div className="">

                <h4 className="search-filter__title">Фильтры: </h4>
                <div className="row">
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            checked={filters.showSettlements}
                            id="show__settlements"
                            label="Показать НП-ы"
                            value="settlements"
                            onChange={handleCheckBoxFilterClick}
                        /></div>
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            id="show__faps"
                            label="Показать ФАП-ы"
                            checked={filters.showFaps}
                            value="faps"
                            onChange={handleCheckBoxFilterClick}
                        /></div>

                </div>
                <div className="row">

                    <SelectArea
                        // empty={true}
                        value={filters.district_id}
                        name="district_id"
                        onChange={handleSelectChange}
                        disabled={loading}
                        label="Район:"
                        query="district"
                    />
                </div>
            </div>
        </CardPanel>
    )
}
