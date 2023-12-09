import React, {useEffect, useState} from 'react'
import {formatTimeDifference} from "../../../functions/locality";
import {BtnMore} from "../../Elements/Buttons/BtnMore/BtnMore";
import "./LocalityItem.scss"
export const LocalityItem = (props) => {

    // medical center
    const [minDistKmMc, setMinDistKmMc] = useState(0);
    const [durationMc, setDurationMc] = useState('-');
    const [staffingMc, setStaffingMc] = useState(-1);
    // medical center facility
    const [minDistKmMcf, setMinDistKmMcf] = useState(0);
    const [durationMcf, setDurationMcf] = useState('-');

    useEffect(() => {
        const distKm = (dist) => {
            return (dist / 1000).toFixed(2)
        }

        // distance to medical center
        if (props.locality.min_distance) {
            let dist = props.locality.min_distance
            let formattedDist = distKm(dist)
            setMinDistKmMc(formattedDist)
        } else setMinDistKmMc(0)

        // medical center durationMc
        if (props.locality.min_duration)
            setDurationMc(formatTimeDifference(props.locality.min_duration))
        else setDurationMc('-')

        // staffingMc
        if (props.locality.mc_staffing)
            setStaffingMc(props.locality.mc_staffing > 0 ? 1 : 0)
        else setStaffingMc(-1)

        // medical center facility
        // durationMc
        // distance to medical center
        if (props.locality.min_facility_distance) {
            let dist = props.locality.min_facility_distance
            let formattedDist = distKm(dist)
            setMinDistKmMcf(formattedDist)
        } else setMinDistKmMcf(0)

        // medical center durationMc
        if (props.locality.min_facility_duration)
            setDurationMcf(formatTimeDifference(props.locality.min_facility_duration))
        else setDurationMcf('-')
    }, [props.locality])


    return (

        <div className="item">


            <div className="item__title" onClick={(e) => {
                props.onLocalityTitleClick(e, props.locality)
            }}>
                <div className="item__link">{props.locality.locality_name}</div>
            </div>

            <div className="mt-1">
                {props.locality.population_population_adult} чел.
            </div>
            <div className="item__body">

                {/* мед учреждение*/}
                <div onClick={(e) => {
                    props.onMedicalCenterClick(e, props.locality, true)
                }} className="item__link">
                    {/* информация о км и времени до ближайшего мед учреждения */}
                    <b>ФАП: </b>
                    <span
                        className={"accent-4 white-text crumb " + (minDistKmMc < 10 ? "teal" : (minDistKmMc < 20 ? "yellow" : "red"))}>
                    {durationMc}, {minDistKmMc} км.  &rarr;  </span>
                    {/*имя мед учреждения */}
                    {props.locality.medical_center_name}
                </div>

                {/*информация о персонале мед учреждения */}
                <div className="mt-2">
                    <span
                        className={"crumb lighten-4 " + (staffingMc > 0 ? "green" : (staffingMc < 0 ? "grey" : "red"))}>
                        Персонал: {staffingMc > 0 ? "есть" : (staffingMc < 0 ? "-" : "нет")}
                    </span>
                </div>

                {/* районная больница */}
                <div className={"my-2"}>
                    <BtnMore>
                        <hr className="my-3 item__line"/>
                        <div onClick={(e) => {
                            props.onMedicalCenterClick(e, props.locality, false)
                        }} className="item__link">
                            <b>РБЦ: </b>
                            {/* информация о км и времени до ближайшего мед учреждения */}
                            <span
                                className={"accent-4 white-text crumb " + (minDistKmMcf < 20 ? "teal" : (minDistKmMcf < 30 ? "yellow" : "red"))}>
                    {durationMcf}, {minDistKmMcf} км.  &rarr;  </span>
                            {/*имя мед учреждения */}
                            {props.locality.mcf_name}
                        </div>
                    </BtnMore>
                </div>


            </div>

        </div>

    )
}