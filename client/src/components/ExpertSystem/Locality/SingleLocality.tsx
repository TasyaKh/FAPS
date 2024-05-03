import React, {FC, useContext, useEffect, useState} from 'react'
import "./SingleLocality.scss"
import {MapContext} from "context/MapContext";
import {useHttp} from "hooks/http.hook";
import {DistanceToMcElem} from "../DistanceToMC";
import {Icon} from "react-materialize";
import {ILocality} from "types/types";

interface Props {
    id: number | null
    back: (e: any) => void

}

export const SingleLocality: FC<Props> = ({id, back}) => {

    const {loading, request} = useHttp()
    const [locality, setLocality] = useState<ILocality>({});
    const [mcs, setMcs] = useState<any[]>([]);
    const {mapState, setMapState} = useContext(MapContext)

    const fetchLocality = async () => {
        try {
            const l = await request(`/api/location/locality/${id}`, 'POST')

            setLocality(l)
        } catch (e) {
        }
    }

    const fetchMcs = async () => {
        try {
            const distMcs = await request(`/api/distance/mc`, 'POST', {locality_id: id})

            setMcs(distMcs)
        } catch (e) {
        }

    }

    useEffect(() => {
        fetchLocality()
        fetchMcs()

    }, [id])

    function handleOnMcClick(e: any, lon: number, lat: number) {

        if (lon && lat)
            setMapState({
                ...mapState,
                zoom: 12,
                center: [lat, lon]
            })
    }

    const onGoToLocality = (locality: ILocality) => {


        if (locality && locality.latitude && locality.longitude) {
            setMapState({
                ...mapState,
                zoom: 12,
                center: [locality.latitude, locality.longitude]
            })
        }

    }

    return (
        <div className="single-locality">

            <div className={"single-locality__wrapper"}>
                <div className="single-locality__head p-4 mb-4">

                    <button
                        className="button-icon"
                        onClick={back}
                    >
                        <Icon className={"material-icons"}>arrow_back</Icon>
                    </button>
                    {/* locality name */}
                    <span className={"single-locality__title link"} onClick={() => {
                        onGoToLocality(locality)
                    }}> {locality?.name}</span>
                    {/*district name*/}
                    <div className={"mt-2"}>
                        <p>{locality?.district?.name} </p>
                        {/* locality coords */}
                        <span className={"single-locality__coords link"} onClick={() => {
                            onGoToLocality(locality)
                        }}>
                            [{locality?.longitude}, {locality?.latitude}]
                        </span>
                        <p><b> Население
                            (взрос./дет.):</b> {locality?.population?.population_adult}/{locality?.population?.population_child}
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
