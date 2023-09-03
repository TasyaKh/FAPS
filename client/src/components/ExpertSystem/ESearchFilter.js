import React, {useCallback, useEffect, useState} from 'react'
import './ESearchFilter.scss'
import { CardPanel} from "react-materialize"
import {useHttp} from "../../hooks/http.hook";
import {SelectArea} from "../SelectArea";

export const ESearchFilter = (props) => {
    const {loading, error, request, clearError} = useHttp()

    const handleSelectChange = (e) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        props.onFilterChanged({[name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])


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
            <div className="search-filter__wrapper">

                <h4 className="search-filter__title">Фильтры:</h4>

                <div className="search-filter__flex">

                    <div className="search-filter__elem">

                        <div className="search-filter__block search-filter__block--high">
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
                </div>
            </div>
        </CardPanel>
    )
}