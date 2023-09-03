import React, {useEffect, useState} from 'react'
import {formatTimeDifference} from "../../functions/locality";
import  "./DistanceMcElem.scss";

export const DistanceMcElem = (props) => {

    // medical center
    const [distKm, setDistKm] = useState(0);
    const [duration, setDuration] = useState('-');


    useEffect(() => {
        const distKm = (dist) => {
            return (dist / 1000).toFixed(2)
        }

        // distance
        if (props.distance) {
            let dist = props.distance
            let formattedDist = distKm(dist)
            setDistKm(formattedDist)
        } else setDistKm(0)

        //durationMc
        if (props.duration)
            setDuration(formatTimeDifference(props.duration))
        else setDuration('-')

    }, [props])


    return (

        <div className="distance-elem">

            <div className="distance-elem__body">

                <span
                    className={"accent-4 white-text crumb " + (distKm < 10 ? "teal" : (distKm < 20 ? "yellow" : "red"))}>
                    {duration}, {distKm} км.  &rarr;  </span>
                {props.name}

            </div>

        </div>

    )
}