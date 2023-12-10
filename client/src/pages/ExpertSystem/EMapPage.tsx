import {ENavigation} from 'components/ExpertSystem/Navigation/ENavigation'
import {MapContext} from 'context/MapContext'
import React, {FC, useEffect, useState} from 'react'
import {EMap} from "../../components/ExpertSystem/YandexMaps/YandexYMap";
import {ESidebar} from "../../components/ExpertSystem/ESidebar";
import "../../scss/indents.scss"
import {useHttp} from "../../hooks/http.hook";
import {useQuery} from "react-query";
import {getLocalitiesWithDistMcs} from "../../api/distances";


export const EMapPage = () => {

    const {loading, request} = useHttp()
    const [objects, setObjects] = useState([])
    // const [localities, setLocalities] = useState([])
    const [hiddenSidebar, setHiddenSidebar] = useState(false)
    const [hiddenNavigation, setHiddenNavigation] = useState(true)
    const [orgs, setOrgs] = useState([])
    // показать подробную информацию о населенном пункте

    const [filters, setFilters] = useState({
        district_id: 2,
    })

    // use vals from local storage
    const [showSettlements, setShowSettlements] = useState(() => {
        const storedVal = localStorage.getItem('showSettlements')
        return storedVal ? JSON.parse(storedVal) : true;
    })
    const [showFaps, setShowFaps] = useState(() => {
        const storedVal = localStorage.getItem('showFaps')
        return storedVal ? JSON.parse(storedVal) : true;
    })

    const {
        data: localitiesWithDistMcs,
        error: localitiesWithDistMcsError,
        isLoading: localitiesWithDistMcsLoading,
        refetch: localitiesWithDistMcsRefetch
    } = useQuery(['getLocalitiesWithDistMcs', filters.district_id], () => getLocalitiesWithDistMcs(filters.district_id));

    const fetchMedicalCenters = async () => {
        try {
            const mc = await request('/api/map', 'POST')

            setObjects(mc.data)

            const fetchedOrgs = await request('/api/map/organizations', 'POST')

            setOrgs(fetchedOrgs.data)

        } catch (e) {
        }

    }

    const [mapState, setMapState] = useState({
        center: [52.287054, 104.281047],
        zoom: 9,
        behaviors: ["default", "scrollZoom"],
        controls: [],
    });

    const handleFilterChanged = (fieldChanged: any) => {

        setFilters({
            ...filters,
            ...fieldChanged
        })

    }

    const handleCheckBoxShowFapsClick = (checked: boolean) => {
        setShowFaps(checked)
    }

    const handleCheckBoxShowSettlementsClick = (checked: boolean) => {
        setShowSettlements(checked)
    }

    // save in local storage
    useEffect(() => {
        localStorage.setItem('showSettlements', JSON.stringify(showSettlements))
    }, [showSettlements]);

    useEffect(() => {
        localStorage.setItem('showFaps', JSON.stringify(showFaps))
    }, [showFaps]);

    // effects
    // ----------------------------------------------------------------------------------------------------

    useEffect(() => {
        fetchMedicalCenters()
    }, []); // Empty dependency array means it will run only on mount


    return (
        <div className="map-page container--map">
            <MapContext.Provider value={{
                // @ts-ignore
                mapState, setMapState
            }}>
                <ESidebar
                    loading={localitiesWithDistMcsLoading}
                    orgs={orgs}
                    showSettlements={showSettlements}
                    showFaps={showFaps}

                    hiddenSidebar={hiddenSidebar}
                    setHiddenSidebar={setHiddenSidebar}
                    setHiddenNavigation={setHiddenNavigation}
                    onFilterChanged={handleFilterChanged}
                    filters={filters}
                    localities={localitiesWithDistMcs}

                    onCheckBoxShowFapsClick={handleCheckBoxShowFapsClick}
                    onCheckBoxShowSettlementsClick={handleCheckBoxShowSettlementsClick}
                />

                <EMap
                    loading={localitiesWithDistMcsLoading}
                    data={objects}
                    localities={localitiesWithDistMcs}
                    orgs={orgs}
                    districtId={filters.district_id}
                    showFaps={showFaps}
                    showSettlements={showSettlements}
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