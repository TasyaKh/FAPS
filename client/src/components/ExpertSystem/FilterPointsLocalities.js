import { SelectArea } from 'components/SelectArea'
import { useHttp } from 'hooks/http.hook'
import React, {  useEffect, useState } from 'react'

export const FilterPointsLocalities = ( props) => {

    const { loading, error, request, clearError } = useHttp()

    const [filters, setFilters] = useState({
       
        district_id: 0
       
    })
   
    // const [isFaps, setIsFpas] = useState(false)

    const handleSelectChange = (e) => {
        const { target } = e
        const { name } = target
        const value = parseInt(target.value)

        setFilters({
            ...filters,
            [name]: !isNaN(value) && value !== 0 ? value : null
        })

    }

    
    useEffect(() => {
        props.fetchData(filters, props.isFaps)
    }, [filters])

    // const handleSelect = async (faps) => {

    //     props.fetchData(filters, faps)
    // };


    return (
        <div>
            <SelectArea
                empty={true}
                name="district_id"
                onChange={handleSelectChange}
                disabled={loading}
                value={props.district_id}
                label="Район:"
                query="district"
            />

      
            <label >
                <input onClick={() => props.setIsFaps(false)} name="group1" type="radio" checked={!props.isFaps} />
                <span>НП</span>
            </label>

            <label >
                <input onClick={() =>  props.setIsFaps(true)} name="group1" type="radio" checked={props.isFaps}  />
                <span>ФАПы</span>
            </label>



        </div>

    )
}