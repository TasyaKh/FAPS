import { SelectArea } from 'components/SelectArea'
import { useHttp } from 'hooks/http.hook'
import React, { useCallback, useEffect, useState } from 'react'

export const FilterPointsLocalities = (/** @type {{ updateData: (arg0: any, arg1: boolean) => void; }} */ props) => {

    const { loading, error, request, clearError } = useHttp()

    const [filters, setFilters] = useState({
        district_id: null
    })


    const handleSelectChange = (e) => {
        const { target } = e
        const { name } = target
        const value = parseInt(target.value)

        setFilters({
            ...filters,
            [name]: !isNaN(value) && value !== 0 ? value : null
        })

    }

    const fetchData = useCallback(async (body) => {

        try {
            const fetched = await request('/api/points/localities', 'POST', body)

            props.updateData(fetched, true)

        } catch (e) { }
    }, [request])


    useEffect(() => {
        fetchData(filters)
    }, [filters])

    return (
        <SelectArea
            empty={true}
            name="district_id"
            onChange={handleSelectChange}
            disabled={loading}
            label="Район:"
            query="district"
        />
    )
}