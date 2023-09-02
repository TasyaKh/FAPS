
import {Clusterer, Map, Placemark, YMaps} from "react-yandex-maps";
import '../Maps.scss'
import {Preloader} from "react-materialize";
import {MapContext} from "../../context/MapContext";
import {useContext} from "react";
export const EMap = (props) => {

    const {mapState, setMapState} = useContext(MapContext)

    const getPointMedCenters = (mc) => {
        let color


        if (mc.district_id === props.districtId) {
            // console.log(mc)
            color = '#0d47a1'
        } else {
            color = '#afafaf'
        }

        return {
            preset: 'islands#icon',
            iconColor: color
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
            objects = props.orgs
        } else {
            objects = props.data.default
        }

        const elActive = objects.find(el => el.active === true)

        if (elActive)
            elActive.active = false

        element.active = true

        setMapState({
            ...mapState,
            zoom: 12,
            'center': [element.latitude, element.longitude]
        })

        // props.setSingleView({
        //     flag: true,
        //     id: element.id,
        //     typeId: element.type_id
        // })
    }

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
                    <YMaps>
                        <Map
                            state={mapState}
                            className="y-map"
                            instanceRef={mapState}
                        >

                            <Clusterer
                                options={{
                                    preset: 'islands#darkGreenClusterIcons',
                                    groupByCoordinates: false,
                                    clusterDisableClickZoom: false,
                                    clusterHideIconOnBalloonOpen: true,
                                    geoObjectHideIconOnBalloonOpen: true,
                                    minClusterSize: props.data.length > 50 ? 3 : 10,
                                    viewportMargin: props.data.length > 50 ? 128 : 12000,
                                    maxZoom:9
                                }}
                            >
                                {/* medical centers */}

                                {props.data && props.data.length > 0 ? props.data.map((el, i) => (
                                    <Placemark
                                        key={i}
                                        geometry={[el.latitude, el.longitude]}
                                        options={(getPointMedCenters(el))}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        onClick={e => handlePlacemarkClick(e, el)}
                                        properties={{
                                            hintContent:[el.latitude, el.longitude, el.name],
                                        }}
                                    />
                                )) : null}

                                {/*organizations*/}
                                {props.orgs && props.orgs.length > 0 ? props.orgs.map((el, i) => (
                                    <Placemark
                                        key={i}
                                        geometry={[el.latitude, el.longitude]}
                                        options={getPointOptionsOrgs()}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        onClick={e => handlePlacemarkClick(e, el)}
                                        properties={{
                                            hintContent: el.name,
                                        }}
                                    />
                                )) : null}

                            </Clusterer>

                            <Clusterer
                                options={{
                                    preset: 'islands#invertedRedClusterIcons',
                                    groupByCoordinates: false,
                                    clusterDisableClickZoom: false,
                                    clusterHideIconOnBalloonOpen: true,
                                    geoObjectHideIconOnBalloonOpen: true,
                                    minClusterSize: props.data.length > 50 ? 3 : 10,
                                    viewportMargin: props.data.length > 50 ? 128 : 12000,
                                    maxZoom:9
                                }}
                            >
                                {props.localities && props.localities.length > 0 ? props.localities.map((el, i) => (
                                    <Placemark
                                        key={i}
                                        geometry={[el.latitude, el.longitude]}
                                        options={getPointOptionsLocalities()}
                                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                        onClick={e => handlePlacemarkClick(e, el)}
                                        properties={{
                                            hintContent: el.name,
                                        }}
                                    />
                                )) : null}
                            </Clusterer>
                            {/*localities*/}


                        </Map>

                    </YMaps>
            }

        </div>

    );
}