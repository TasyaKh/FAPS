import {ENavigation} from 'components/ExpertSystem/ENavigation'
import {MapContext} from 'context/MapContext'
import {useHttp} from 'hooks/http.hook'
import React, {useCallback, useEffect, useState} from 'react'
import {EMap} from "../../components/ExpertSystem/YandexYMap";

export const EMapPage = () => {

    const {loading, error, request, clearError} = useHttp()
    const [objects, setObjects] = useState({
        data: {
            default: [],
            modified: []
        }
    })
    const [hiddenSidebar, setHiddenSidebar] = useState(false)
    const [hiddenNavigation, setHiddenNavigation] = useState(true)
    const [orgs, setOrgs] = useState([])
    const [singleView, setSingleView] = useState({
        flag: false,
        id: null
    })


    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])


    const [mapState, setMapState] = useState({
        center: [52.287054, 104.281047],
        zoom: 9,
        behaviors: ["default", "scrollZoom"],
        controls: [],
    });

    return (
        <div className="map-page container--map">
            <MapContext.Provider value={{
                mapState, setMapState
            }}>

                <EMap/>
               
                <ENavigation
                    setHiddenSidebar={setHiddenSidebar}
                    hiddenNavigation={hiddenNavigation}
                    setHiddenNavigation={setHiddenNavigation}
                />

            </MapContext.Provider>
        </div>
    )
}