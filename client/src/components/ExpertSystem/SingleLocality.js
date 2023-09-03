import React, {useEffect, useState} from 'react'
import "./SingleLocality.scss"
import {ReactComponent as ArrowBack} from '../../img/arrow-back.svg'
import {useHttp} from "../../hooks/http.hook";
import {LocalityItem} from "./LocalityItem";
import {DistanceMcElem} from "../Elements/DistanceMcElem";

export const SingleLocality = (props) => {

    const {loading, request} = useHttp()

    const [locality, setLocality] = useState({});
    const [mcs, setMcs] = useState({});


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

    return (

        <div className="single-locality">

            <div className={"single-locality__wrapper"}>
                <div className="single-locality__head p-4 mb-4">

                    <button
                        className="single-locality__button single-locality__button--back"
                        onClick={props.back}
                    >
                        <ArrowBack/>
                    </button>

                    <span className={"single-locality__title"}> {locality.name}</span>

                    <div className={"mt-2"}>
                        <p>{locality.district_name} </p>
                        <span className={"single-locality__coords"}> ({locality.longitude}, {locality.latitude})</span>
                        <p><b> население (взрос./дет.):</b> {locality.population_adult}/{locality.population_child}</p>

                    </div>


                </div>


                <div className="single-locality__body p-4">


                    <div onClick={(e) => {

                    }} className="single-locality__link">

                        {!loading ? mcs && mcs.length > 0 ? mcs.map((mc, i) => (

                                    <div>
                                        <DistanceMcElem
                                            name={mc.mc_name}
                                            distance={mc.distance}
                                            duration={mc.duration}
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