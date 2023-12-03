import React, {useEffect} from 'react'
import './ESearchFilter.scss'
import {CardPanel, Checkbox} from "react-materialize"
import {useHttp} from "../../../hooks/http.hook";
import {SelectArea} from "../../FAPS/SelectArea";

export const ESearchFilter = (props) => {
    const {loading, error, request, clearError} = useHttp()


    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])

    const handleSelectChange = (e) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        props.onFilterChanged({[name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleCheckBoxFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target} = e
        const {value, checked} = target
        if (target.value === 'faps')
            props.onCheckBoxShowFapsClick(checked)
        else if (target.value === 'settlements')
            props.onCheckBoxShowSettlementsClick(checked)

    }


    // const fetchDataFilter = useCallback(async (body) => {
    //     try {
    //
    //         if (props.source === 'table') {
    //             body = {
    //                 ...body,
    //                 source: 'table'
    //             }
    //         }
    //
    //         const fetched = await request('/api/filter', 'POST', body)
    //
    //         props.updateData(fetched.data, true)
    //
    //     } catch (e) {
    //     }
    // }, [request])
    //
    // useEffect(() => {
    //     fetchDataFilter(filters)
    // }, [filters])

    return (

        <CardPanel
            className={`search-filter white ${props.className} ${(props.visible ? 'search-filter--visible' : 'search-filter--hidden')} ${props.style}`}>
            <div className="">

                <h4 className="search-filter__title">Фильтры:</h4>
                <div className="row">
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            checked={props.showSettlements}
                            id="show__settlements"
                            label="Показать НП-ы"
                            value="settlements"
                            onClick={handleCheckBoxFilterClick}
                        /></div>
                    <div className="col">
                        <Checkbox
                            filledIn
                            className=""
                            id="show__faps"
                            label="Показать ФАП-ы"
                            checked={props.showFaps}
                            value="faps"
                            onClick={handleCheckBoxFilterClick}
                        /></div>

                </div>
                <div className="row">

                    <SelectArea
                        // empty={true}
                        value={props.filters.district_id}
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