import {ENavigation} from 'components/ExpertSystem/Navigation/ENavigation'
import {MapContext} from 'context/MapContext'
import React, {useCallback, useEffect, useState} from 'react'
import {EMap} from "../../components/ExpertSystem/YandexMaps/YandexYMap";
import {ESidebar} from "../../components/ExpertSystem/ESidebar";
import "../../scss/indents.scss"
import {fetchLocalitiesWithDistMcs} from "../../store/slices/distance";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useHttp} from "../../hooks/http.hook";

export const EMapPage = () => {

    const dispatch = useAppDispatch();
    const { data:localities, loading:loadingL, error:errorL} = useAppSelector((state) => state.distance);

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
        // try {


        dispatch(fetchLocalitiesWithDistMcs(districtId))
        // = await request('/api/distance/localities-nearest-faps', 'POST', {district_id: districtId})

        // setLocalities(localities)
        // } catch (e) {
        // }
    }

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

    const handleCheckBoxShowFapsClick = (checked) => {
        setShowFaps(checked)
    }

    const handleCheckBoxShowSettlementsClick = (checked) => {
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
                    loading={loadingL}
                    data={objects}
                    orgs={orgs}

                    showSettlements={showSettlements}
                    showFaps={showFaps}

                    // singleView={singleView}
                    // setSingleView={setSingleView}
                    hiddenSidebar={hiddenSidebar}
                    setHiddenSidebar={setHiddenSidebar}
                    setHiddenNavigation={setHiddenNavigation}
                    onFilterChanged={handleFilterChanged}
                    filters={filters}
                    localities={localities}

                    onCheckBoxShowFapsClick={handleCheckBoxShowFapsClick}
                    onCheckBoxShowSettlementsClick={handleCheckBoxShowSettlementsClick}
                />

                <EMap
                    loading={loadingL}
                    data={objects}
                    localities={localities}
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