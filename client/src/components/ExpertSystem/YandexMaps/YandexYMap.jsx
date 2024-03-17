import '../../FAPS/Maps.scss'
import {Preloader} from "react-materialize";
import {MapContext} from "context/MapContext";
import {useContext, useEffect, useRef, useState} from "react";
import {useScript, loadScript} from "hooks/useScript";
import {HEATMAP_Y, YMAP} from "constants";

export const EMap = (props) => {
    const [mapLoaded, setMapLoaded] = useState(false)
    const mapRef = useRef(null);
    useScript(YMAP, onMapLoaded)
    // useScript(HEATMAP_Y)

    const {mapState, setMapState} = useContext(MapContext)

    // map object
    const [Map, setMap] = useState(null)

    async function onMapLoaded() {
        setMapLoaded(true)
    }

    const getTypePointMedCenters = (mc) => {
        let color
        let thisDistrict = false

        if (mc.district_id === props.districtId) {
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
        // console.log(props.showSettlements, props.localities)
        let objects
        //Проверяем организация или ФАП
        if (element.type_id === 3) {
            objects = props.orgs
        } else {
            objects = props.data.default
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
            window.ymaps.ready(init);

            function init() {
                mapRef.current.innerHTML = ''; // Clear the map container before adding new placemarks

                let map = new window.ymaps.Map(mapRef.current, {
                    center: [mapState.center[0], mapState.center[1]],
                    zoom: mapState.zoom
                });
                setMap(map)
                // initHeatmap(map)
                initLocalities(map)
                initMedicalCenters(map)
            }

            loadScript(HEATMAP_Y)
        }
    }

    function initHeatmap(map) {

        // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
        window.ymaps.modules.require(['Heatmap'], function (Heatmap) {
                const data = {
                        type: 'FeatureCollection',
                        features: [{
                            id: 'id1',
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [37.782551, -122.445368]
                            },
                            properties: {
                                weight: 1
                            }
                        }, {
                            id: 'id2',
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [37.782745, -122.444586]
                            },
                            properties: {
                                weight: 10
                            }
                        }]
                    },
                    heatmap = new Heatmap(data);
                heatmap.setMap(map);
            }
        );
    }

    function initLocalities(map) {
        // console.log("props?.localities", props?.localities, Map)
        let placemarks = [];
        if (props.showSettlements && props.localities && props.localities.length > 0) {
            for (let i = 0; i < props.localities.length; i++) {
                let locality = props.localities[i];
                let placemark = new window.ymaps.Placemark(
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
                minClusterSize: props.data.length > 50 ? 3 : 10,
                viewportMargin: props.data.length > 50 ? 128 : 12000,
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
            minClusterSize: props.data.length > 50 ? 3 : 10,
            viewportMargin: props.data.length > 50 ? 128 : 12000,
            maxZoom: 9
        };
        let clusterer = new window.ymaps.Clusterer(clustererOptions);
        map.geoObjects.add(clusterer);

        // Add medical centers
        if (props.data && props.data.length > 0) {
            props.data.forEach((el, i) => {
                let type = getTypePointMedCenters(el);
                if (props.showFaps || type.thisDistrict) {
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
        if (props.orgs && props.orgs.length > 0) {
            props.orgs.forEach((el, i) => {
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
    }, [props.localities, mapLoaded]);

    // center, zoom changed - update map
    useEffect(() => {
        if (mapLoaded && Map) {
            Map.setCenter([mapState.center[0], mapState.center[1]], mapState.zoom);
        }
    }, [mapState.zoom, mapState.center]);

    return (
        <div className="map">
            {
                props.loading ?
                    <div className="map__preloader">
                        <Preloader
                            active
                            color="blue"
                            flashing={false}
                            size="small"
                        />
                    </div> :
                    <div ref={mapRef} className={"y-map"}></div>
                // <YMaps>
                //     <Map
                //         state={mapState}
                //         className="y-map"
                //         instanceRef={mapState}
                //     >
                //
                //         <Clusterer
                //             options={{
                //                 preset: 'islands#darkGreenClusterIcons',
                //                 groupByCoordinates: false,
                //                 clusterDisableClickZoom: false,
                //                 clusterHideIconOnBalloonOpen: true,
                //                 geoObjectHideIconOnBalloonOpen: true,
                //                 minClusterSize: props.data.length > 50 ? 3 : 10,
                //                 viewportMargin: props.data.length > 50 ? 128 : 12000,
                //                 maxZoom: 9
                //             }}
                //         >
                //             {/* medical centers */}
                //
                //             {props.data && props.data.length > 0 ? props.data.map((el, i) => {
                //                 let type = getTypePointMedCenters(el)
                //                 if (props.showFaps || type.thisDistrict) {
                //                     return (
                //                         <Placemark
                //                             key={i}
                //                             geometry={[el.latitude, el.longitude]}
                //                             options={type}
                //                             modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                //                             onClick={e => handlePlacemarkClick(e, el)}
                //                             properties={{
                //                                 hintContent: `${el.name } ${el.latitude}, ${el.longitude}`,
                //                             }}
                //                         />
                //                     );
                //                 } else {
                //                     return null;
                //                 }
                //             }) : null}
                //
                //             {/*organizations*/}
                //             {props.orgs && props.orgs.length > 0 ? props.orgs.map((el, i) => (
                //                 <Placemark
                //                     key={i}
                //                     geometry={[el.latitude, el.longitude]}
                //                     options={getPointOptionsOrgs()}
                //                     modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                //                     onClick={e => handlePlacemarkClick(e, el)}
                //                     properties={{
                //                         hintContent: el.name,
                //                     }}
                //                 />
                //             )) : null}
                //
                //         </Clusterer>
                //
                //         {/*localities*/}
                //         {props.showSettlements ? <Clusterer
                //             options={{
                //                 preset: 'islands#invertedRedClusterIcons',
                //                 groupByCoordinates: false,
                //                 clusterDisableClickZoom: false,
                //                 clusterHideIconOnBalloonOpen: true,
                //                 geoObjectHideIconOnBalloonOpen: true,
                //                 minClusterSize: props.data.length > 50 ? 3 : 10,
                //                 viewportMargin: props.data.length > 50 ? 128 : 12000,
                //                 maxZoom: 9
                //             }}
                //         >
                //             {props.localities && props.localities.length > 0 ? props.localities.map((el, i) => (
                //                 <Placemark
                //                     key={i}
                //                     geometry={[el.locality_latitude, el.locality_longitude]}
                //                     options={getPointOptionsLocalities()}
                //                     modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                //                     onClick={e => handlePlacemarkClick(e, el)}
                //                     properties={{
                //                         hintContent: el.locality_name,
                //                     }}
                //                 />
                //             )) : null}
                //         </Clusterer> : null
                //         }
                //
                //     </Map>
                //
                // </YMaps>
            }

        </div>

    );
}
