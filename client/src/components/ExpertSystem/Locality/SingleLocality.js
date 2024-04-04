import React, {useContext, useEffect, useState} from 'react'
import "./SingleLocality.scss"
import {MapContext} from "../../../context/MapContext";
import {useHttp} from "../../../hooks/http.hook";
import {DistanceToMcElem} from "../DistanceToMC";

export const SingleLocality = (props) => {

    const {loading, request} = useHttp()
    const [locality, setLocality] = useState({});
    const [mcs, setMcs] = useState({});
    const {mapState, setMapState} = useContext(MapContext)

    const fetchLocality = async () => {
        try {
            const l = await request(`/api/location/locality/${props.id}`, 'POST')

            setLocality(l)
        } catch (e) {
        }
    }

    const fetchMcs = async () => {
        try {
            const distMcs = await request(`/api/distance/mc`, 'POST', {locality_id: props.id})

            setMcs(distMcs)
        } catch (e) {
        }

    }

    useEffect(() => {
        fetchLocality()
        fetchMcs()

    }, [props.id])

    function handleOnMcClick(e, lon, lat) {

        if (lon && lat)
            setMapState({
                ...mapState,
                zoom: 12,
                center: [lat, lon]
            })
    }


    return (
        <div className="single-locality">

            <div className={"single-locality__wrapper"}>
                <div className="single-locality__head p-4 mb-4">

                    <button
                        className="single-locality__button single-locality__button--back"
                        onClick={props.back}
                    >
                        <img src={'/img/arrow-back.svg'}/>
                    </button>

                    <span className={"single-locality__title"}> {locality?.name}</span>

                    <div className={"mt-2"}>
                        <p>{locality?.district?.name} </p>
                        <span
                            className={"single-locality__coords"}> ({locality?.longitude}, {locality?.latitude})</span>
                        <p><b> население (взрос./дет.):</b> {locality?.population?.population_adult}/{locality?.population?.population_child}
                        </p>

                    </div>


                </div>


                <div className="single-locality__body p-4">


                    <div onClick={(e) => {

                    }} className="single-locality__link">

                        {!loading ? mcs && mcs.length > 0 ? mcs.map((dist, i) => (

                                    <div key={i}>
                                        <DistanceToMcElem
                                            nameMC={dist.medical_center?.name}
                                            distM={dist.distance}
                                            durationS={dist.duration}
                                            longitude={dist.medical_center?.longitude}
                                            latitude={dist.medical_center?.latitude}
                                            onMcClick={handleOnMcClick}
                                            key={i}
                                        />

                                        <hr className="my-3 single-locality__line"/>
                                    </div>

                                )) :
                                <div className="list-view--empty">
                                    Таких элементов не найдено
                                </div> :
                            'loading 1'
                        }

                    </div>


                </div>
            </div>
        </div>

    )
}
