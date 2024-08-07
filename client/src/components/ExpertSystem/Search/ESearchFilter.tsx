import React, {FC, useEffect} from 'react'
import './ESearchFilter.scss'
import {CardPanel, Checkbox, Select} from "react-materialize"
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
        switch (target.value) {
            case 'faps':
                onFilterChanged({...filters, showFaps: checked})
                break
            case 'settlements':
                onFilterChanged({...filters, showSettlements: checked})
                break
            case 'heatmap':
                onFilterChanged({...filters, showHeatmap: checked})
                break
        }
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
                            label="Населенные пункты"
                            value="settlements"
                            onChange={handleCheckBoxFilterClick}
                        /></div>
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            id="show__faps"
                            label="ФАП-ы"
                            checked={filters.showFaps}
                            value="faps"
                            onChange={handleCheckBoxFilterClick}
                        /></div>
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            id="show__heatmap"
                            label="Тепловая карта"
                            checked={filters.showHeatmap}
                            value="heatmap"
                            onChange={handleCheckBoxFilterClick}
                        /></div>
                </div>
                {/*district*/}
                <div className="row">
                    <SelectArea
                        value={filters.district_id}
                        name="district_id"
                        onChange={handleSelectChange}
                        disabled={loading}
                        label="Район:"
                        query="district"
                    />
                </div>
                {/*population*/}
                <div className="row">
                    <SelectArea
                        value={filters.population_id}
                        name="population_id"
                        onChange={handleSelectChange}
                        disabled={loading}
                        label="Население:"
                        query="population"
                    />
                </div>
            </div>
        </CardPanel>
    )
}
