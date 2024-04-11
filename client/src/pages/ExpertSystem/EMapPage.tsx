import {ENavigation} from 'components/ExpertSystem/Navigation/ENavigation'
import {MapContext} from 'context/MapContext'
import React, {useEffect, useState} from 'react'
import {EMap} from "../../components/ExpertSystem/YandexMap/EMap";
import {ESidebar} from "../../components/ExpertSystem/ESidebar";
import "../../scss/indents.scss"
import {useHttp} from "../../hooks/http.hook";
import {useQuery} from "react-query";
import {getLocalitiesWithDistMcs} from "../../api/distances";
import {Order} from "../../enums";

export interface IFilterEMap {
    district_id: number,
    population_population_adult_order: Order,
    search: string,

    showFaps: boolean,
    showSettlements: boolean,
    showHeatmap: boolean,
}

export const EMapPage = () => {

    const {loading, request} = useHttp()
    const [objects, setObjects] = useState([])
    // const [localities, setLocalities] = useState([])
    const [hiddenSidebar, setHiddenSidebar] = useState(false)
    const [hiddenNavigation, setHiddenNavigation] = useState(true)
    const [orgs, setOrgs] = useState([])
    // показать подробную информацию о населенном пункте

    const getLocalStorageValue = (key: string, defaultValue = false) => {
        const storedVal = localStorage.getItem(key);
        return storedVal ? JSON.parse(storedVal) : defaultValue;
    };

    const [filters, setFilters] = useState<IFilterEMap>({
        district_id: 2,
        search: '',
        population_population_adult_order: Order.DESC,
        showFaps: getLocalStorageValue('showFaps'),
        showSettlements: getLocalStorageValue('showSettlements'),
        showHeatmap: getLocalStorageValue('showHeatmap'),
    })

    const {
        data: localitiesWithDistMcs,
        // error: localitiesWithDistMcsError,
        isLoading: localitiesWithDistMcsLoading,
        // refetch: localitiesWithDistMcsRefetch
    } = useQuery(['getLocalitiesWithDistMcs', filters.district_id, filters.search], () => getLocalitiesWithDistMcs({...filters}));

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

    const handleFilterChanged = (fieldChanged: IFilterEMap) => {

        setFilters({
            ...filters,
            ...fieldChanged
        })

    }

    // --------------------------------------------------------------------------------------------------------------
    // effects
    // --------------------------------------------------------------------------------------------------------------
    // save in local storage
    useEffect(() => {
        localStorage.setItem('showSettlements', JSON.stringify(filters.showSettlements))
    }, [filters.showSettlements]);

    useEffect(() => {
        localStorage.setItem('showFaps', JSON.stringify(filters.showFaps))
    }, [filters.showFaps]);

    useEffect(() => {
        localStorage.setItem('showHeatmap', JSON.stringify(filters.showHeatmap))
    }, [filters.showHeatmap]);


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
                    hiddenSidebar={hiddenSidebar}
                    setHiddenSidebar={setHiddenSidebar}
                    setHiddenNavigation={setHiddenNavigation}
                    onFilterChanged={handleFilterChanged}
                    filters={filters}
                    localities={localitiesWithDistMcs}
                />

                <EMap
                    isLoading={localitiesWithDistMcsLoading}
                    data={objects}
                    localities={localitiesWithDistMcs ?? []}
                    orgs={orgs}
                    districtId={filters.district_id}
                    filters={filters}
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
