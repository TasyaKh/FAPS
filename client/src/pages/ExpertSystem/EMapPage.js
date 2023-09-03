import {ENavigation} from 'components/ExpertSystem/ENavigation'
import {MapContext} from 'context/MapContext'
import {useHttp} from 'hooks/http.hook'
import React, {useCallback, useEffect, useState} from 'react'
import {EMap} from "../../components/ExpertSystem/YandexYMap";
import {ESidebar} from "../../components/ExpertSystem/ESidebar";
import "../../scss/indents.scss"

export const EMapPage = () => {

    const {loading, request} = useHttp()
    const [objects, setObjects] = useState([])
    const [localities, setLocalities] = useState([])
    const [hiddenSidebar, setHiddenSidebar] = useState(false)
    const [hiddenNavigation, setHiddenNavigation] = useState(true)
    const [orgs, setOrgs] = useState([])
    // показать подробную информацию о населенном пункте

    const [filters, setFilters] = useState({
        district_id: 2,
    })


    const fetchMedicalCenters = async () => {
        try {
            const mc = await request('/api/map', 'POST')

            setObjects(mc.data)

            const fetchedOrgs = await request('/api/map/organizations', 'POST')

            setOrgs(fetchedOrgs.data)

        } catch (e) {
        }

    }

    const fetchLocalities = async (districtId) => {
        try {
            const localities = await request('/api/location/localities-with-faps', 'POST', {district_id: districtId})

            setLocalities(localities)
        } catch (e) {
        }
    }
    // useEffect(() => {
    //     if (error) {
    //         console.log('Ошибка: ' + error)
    //     }
    //     clearError()
    // }, [clearError, error])


    const [mapState, setMapState] = useState({
        center: [52.287054, 104.281047],
        zoom: 9,
        behaviors: ["default", "scrollZoom"],
        controls: [],
    });

    const handleFilterChanged = (fieldChanged) => {

        setFilters({
            ...filters,
            ...fieldChanged
        })

    }

    // effects
    // ----------------------------------------------------------------------------------------------------
    useEffect(() => {
        fetchData(filters)
    }, [filters])

    useEffect(() => {
        fetchMedicalCenters()
    }, []); // Empty dependency array means it will run only on mount

    const fetchData = useCallback(async (filters) => {
        await fetchLocalities(filters.district_id)
        // eslint-disable-next-line
    }, [request])






    return (
        <div className="map-page container--map">
            <MapContext.Provider value={{
                mapState, setMapState
            }}>
                <ESidebar
                    loading={loading}
                    data={objects}
                    orgs={orgs}
                    // singleView={singleView}
                    // setSingleView={setSingleView}
                    hiddenSidebar={hiddenSidebar}
                    setHiddenSidebar={setHiddenSidebar}
                    setHiddenNavigation={setHiddenNavigation}
                    onFilterChanged={handleFilterChanged}
                    filters={filters}
                    localities={localities}
                />

                <EMap
                    loading={loading}
                    data={objects}
                    localities={localities}
                    orgs={orgs}
                    districtId={filters.district_id}
                />

                <ENavigation
                    setHiddenSidebar={setHiddenSidebar}
                    hiddenNavigation={hiddenNavigation}
                    setHiddenNavigation={setHiddenNavigation}
                />

            </MapContext.Provider>
        </div>
    )
}