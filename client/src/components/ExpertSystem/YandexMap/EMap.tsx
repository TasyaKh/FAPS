// @ts-nocheck
import '../../FAPS/Maps.scss'
import {Preloader} from "react-materialize";
import {MapContext} from "context/MapContext";
import {FC, useContext, useEffect, useRef, useState} from "react";
import {useScript, loadScript} from "hooks/useScript";
import {HEATMAP_Y, YMAP} from "constants";
import {getPopulationWeight} from "./population-weight";
import {ILocalitiDistToNearectMC} from "../../../types/types";
import {IFilterEMap} from "../../../pages/ExpertSystem/EMapPage";

interface EMapProps {
    districtId: number,
    orgs: any,
    localities: ILocalitiDistToNearectMC[],
    data: ILocalitiDistToNearectMC[],
    filters: IFilterEMap,
    isLoading: boolean
}

export const EMap: FC<EMapProps> = ({
                                        districtId,
                                        orgs,
                                        localities,
                                        data,
                                        filters,
                                        isLoading
                                    }) => {
    //if map script was loaded
    const [mapLoaded, setMapLoaded] = useState(false)
    //map
    const mapRef = useRef(null);
    // init ymap script
    useScript(YMAP, onMapLoaded)

    const {mapState, setMapState} = useContext(MapContext)

    // map object
    const [Map, setMap] = useState(null)

    async function onMapLoaded() {
        setMapLoaded(true)
    }

    const getTypePointMedCenters = (mc) => {
        let color
        let thisDistrict = false

        if (mc.district_id === districtId) {
            color = '#0d47a1'
            thisDistrict = true
        } else {
            color = '#afafaf'
        }

        return {
            preset: 'islands#icon',
            iconColor: color,
            thisDistrict: thisDistrict,
        };
    };

    const getPointOptionsOrgs = () => {
        return {
            preset: 'islands#medicalIcon',
            iconColor: '#e7d1ab'
        }
    }

    const getPointOptionsLocalities = () => {
        return {
            preset: 'islands#circleDotIcon',
            iconColor: '#de6363',
            iconImageSize: [10, 10],
        }
    }

    const handlePlacemarkClick = (e, element) => {
        let objects
        //Проверяем организация или ФАП
        if (element.type_id === 3) {
            objects = orgs
        } else {
            objects = data.default
        }


        const elActive = objects?.find(el => el.active === true)

        if (elActive)
            elActive.active = false

        element.active = true

        setMapState({
            ...mapState,
            zoom: 12,
            center: [element.locality_latitude, element.locality_longitude]
        })
    }

    async function initMap() {

        if (window.ymaps && mapRef.current) {
            window.ymaps.ready(init); //create map

            function init() {
                mapRef.current.innerHTML = ''; // Clear the map container before adding new placemarks
                // set map settings
                let map = new window.ymaps.Map(mapRef.current, {
                    center: [mapState.center[0], mapState.center[1]],
                    zoom: mapState.zoom,
                    controls: []
                });
                setMap(map)
                initHeatmap(map, localities)
                initLocalities(map)
                initMedicalCenters(map)
                // set map center
                if (localities && localities.length > 0) {
                    setMapState({
                        ...mapState,
                        center: [localities[0]?.locality_latitude, localities[0]?.locality_longitude],
                    })
                }
            }

            loadScript(HEATMAP_Y)
        }
    }

    // get heatmap points
    function prepareFeaturesHeatmap(localities) {
        let features = []
        localities?.forEach((locality) => {
            let weight = getPopulationWeight(locality.population_population_adult ?? 0)
            features.push({
                id: locality.id,
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [locality.locality_latitude, locality.locality_longitude]
                },
                properties: {
                    weight: weight // set weight on base of population
                }
            })
        })

        return features
    }

    function initHeatmap(map, localities) {

        let features = prepareFeaturesHeatmap(localities)

        // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
        window.ymaps.modules.require(['Heatmap'], function (Heatmap) {
                const data = {
                        type: 'FeatureCollection',
                        features: features
                    },
                    heatmap = new Heatmap(data);
                heatmap.options.set('radius', 23);
                heatmap.setMap(map);
            }
        );
    }

    function initLocalities(map) {

        let placemarks = [];
        if (filters.showSettlements && localities && localities.length > 0) {

            // output localities
            for (let i = 0; i < localities.length; i++) {
                let locality = localities[i]; //get locality
                let placemark = new window.ymaps.Placemark( //create place-mark
                    [locality.locality_latitude, locality.locality_longitude],
                    {
                        hintContent: locality.locality_name
                    },
                    getPointOptionsLocalities()
                );

                placemark.events.add('click', function (e) {
                    handlePlacemarkClick(e, locality);
                });

                placemarks.push(placemark);
            }

            // Clusterer options
            let clustererOptions = {
                preset: 'islands#invertedRedClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: false,
                clusterHideIconOnBalloonOpen: true,
                geoObjectHideIconOnBalloonOpen: true,
                minClusterSize: data.length > 50 ? 3 : 10,
                viewportMargin: data.length > 50 ? 128 : 12000,
                maxZoom: 9
            };

            // Create Clusterer instance
            let clusterer = new window.ymaps.Clusterer(clustererOptions);
            clusterer.add(placemarks);
            map.geoObjects.add(clusterer);
        }
    }

    function initMedicalCenters(map) {

        // Create Clusterer instance
        let clustererOptions = {
            preset: 'islands#darkGreenClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: false,
            clusterHideIconOnBalloonOpen: true,
            geoObjectHideIconOnBalloonOpen: true,
            minClusterSize: data.length > 50 ? 3 : 10,
            viewportMargin: data.length > 50 ? 128 : 12000,
            maxZoom: 9
        };
        let clusterer = new window.ymaps.Clusterer(clustererOptions);
        map.geoObjects.add(clusterer);

        // Add medical centers
        if (data && data.length > 0) {
            data.forEach((el, i) => {
                let type = getTypePointMedCenters(el);
                if (filters.showFaps || type.thisDistrict) {
                    let placemark = new window.ymaps.Placemark(
                        [el.latitude, el.longitude],
                        {
                            hintContent: `${el.name} ${el.latitude}, ${el.longitude}`
                        },
                        type
                    );
                    placemark.events.add('click', function (e) {
                        handlePlacemarkClick(e, el);
                    });
                    clusterer.add(placemark);
                }
            });
        }

        // Add organizations
        if (orgs && orgs.length > 0) {
            orgs.forEach((el, i) => {
                let placemark = new window.ymaps.Placemark(
                    [el.latitude, el.longitude],
                    {
                        hintContent: el.name
                    },
                    getPointOptionsOrgs()
                );
                placemark.events.add('click', function (e) {
                    handlePlacemarkClick(e, el);
                });
                clusterer.add(placemark);
            });
        }
    }

    useEffect(() => {
        if (mapLoaded) initMap()
    }, [localities, mapLoaded,
        // if filter values changed
        filters.showFaps, filters.showSettlements]);

    // center, zoom changed - update map
    useEffect(() => {
        if (mapLoaded && Map) {
            // console.log("ddd", [mapState.center[0], mapState.center[1]], mapState.zoom)
            Map.setCenter([mapState.center[0], mapState.center[1]], mapState.zoom);
        }
    }, [mapState.zoom, mapState.center]);

    return (
        <div className="map">
            {
                isLoading ?
                    <div className="map__preloader">
                        <Preloader
                            active
                            color="blue"
                            flashing={false}
                            size="small"
                        />
                    </div> :
                    <div ref={mapRef} className={"y-map"}></div>
            }

        </div>

    );
}
