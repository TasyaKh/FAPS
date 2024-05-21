import React, {type FC, useEffect, useState} from 'react'
import {formatTimeDifference} from "../../../functions/locality";
import "./DistanceToMcElem.scss";

interface DistanceMcElemProps {
    distM: number;
    durationS: number;
    nameMC: string;
    longitude: number,
    latitude: number
    onMcClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, lon: number, lat: number) => void;
}

export const DistanceToMcElem:
    FC<DistanceMcElemProps> = ({
                                   distM, durationS, nameMC,
                                   longitude, latitude, onMcClick
                               }) => {
    // medical center
    const [distKm, setDistKm] = useState(0);
    const [duration, setDuration] = useState('-');

    useEffect(() => {
        const distKm = (dist: number) => {
            return Number((dist / 1000).toFixed(2))
        }

        // distance
        if (distM) {
            let formattedDist = distKm(distM)
            setDistKm(formattedDist)
        } else setDistKm(0)

        //durationMc
        if (durationS)
            setDuration(formatTimeDifference(durationS))
        else setDuration('-')

    }, [distM, durationS])

    return (
        <div className="distance-elem">
            <div className="distance-elem__body">
                <div className={"link"} onClick={(e) => onMcClick(e, longitude, latitude)}>
                <span
                    className={"accent-4 white-text crumb " + (distKm < 10 ? "teal" : (distKm < 20 ? "yellow" : "red"))}>
                    {duration}, {distKm} км.  &rarr;  </span>
                    {nameMC}
                </div>
            </div>
        </div>
    )
}
