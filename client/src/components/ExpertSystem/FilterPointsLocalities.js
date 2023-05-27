import { SelectArea } from 'components/SelectArea'
import { useHttp } from 'hooks/http.hook'
import React, { useCallback, useEffect, useState } from 'react'
import { columnsPointsLocalities, columnsPointsMedicalCenters } from './ColumnsTables'

export const FilterPointsLocalities = (props) => {

    const { loading, error, request, clearError } = useHttp()

    const [filters, setFilters] = useState({
        district_id: null
    })

    const [isFaps, setIsFpas] = useState(false)

    const handleSelectChange = (e) => {
        const { target } = e
        const { name } = target
        const value = parseInt(target.value)

        setFilters({
            ...filters,
            [name]: !isNaN(value) && value !== 0 ? value : null
        })

    }

    const fetchData = useCallback(async (body, faps) => {

        try {
          
            let headers = {}
            let req =""

            if(faps){
                req = '/api/points/medical-centers'
                headers = columnsPointsMedicalCenters
            }else{
                req =  '/api/points/localities'
                headers = columnsPointsLocalities
            }


            const fetched = await request(req, 'POST', body)

            console.log(fetched)
            props.updateData(fetched, faps)

        } catch (e) { }
    }, [request])


    useEffect(() => {
        fetchData(filters, isFaps)
    }, [filters])

    const handleSelect = async (faps) => {

        setIsFpas(faps)

       await fetchData(filters, faps)
    };


    return (
        <div>
            <SelectArea
                empty={true}
                name="district_id"
                onChange={handleSelectChange}
                disabled={loading}
                label="Район:"
                query="district"
            />

      
            <label >
                <input onClick={() => handleSelect(false)} name="group1" type="radio" checked={!isFaps} />
                <span>НП</span>
            </label>

            <label >
                <input onClick={() => handleSelect(true)} name="group1" type="radio" />
                <span>ФАПы</span>
            </label>



        </div>

    )
}