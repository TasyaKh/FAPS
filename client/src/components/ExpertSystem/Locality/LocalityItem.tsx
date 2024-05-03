import React, {FC, useEffect, useState} from 'react'
import {formatTimeDifference} from "functions/locality";
import {BtnMore} from "../../Elements/Buttons/BtnMore/BtnMore";
import "./LocalityItem.scss"
import {ILocalitiDistToNearectMC} from "types/types";
interface LocalityItemProps {
    locality:ILocalitiDistToNearectMC
    onLocalityTitleClick:(e:any, locality:ILocalitiDistToNearectMC)=>void
    onMedicalCenterClick:(e:any, locality:ILocalitiDistToNearectMC, isMC:boolean)=>void
}

export const LocalityItem: FC<LocalityItemProps> = ({locality, onLocalityTitleClick, onMedicalCenterClick}) => {

    // medical center
    const [minDistKmMc, setMinDistKmMc] = useState("0");
    const [durationMc, setDurationMc] = useState({mins: -1, formatted: "-"});
    const [staffingMc, setStaffingMc] = useState(-1);
    // medical center facility
    const [minDistKmMcf, setMinDistKmMcf] = useState("0");
    const [durationMcf, setDurationMcf] = useState({mins: -1, formatted: "-"});

    useEffect(() => {
        const distKm = (dist:number) => {
            return (dist / 1000).toFixed(2)
        }

        // distance to medical center
        if (locality.min_distance) {
            let dist = locality.min_distance
            let formattedDist = distKm(dist)
            setMinDistKmMc(formattedDist)
        } else setMinDistKmMc("0")

        // medical center durationMc
        if (locality.min_duration)
            setDurationMc({
                mins: locality.min_duration / 60,
                formatted: formatTimeDifference(locality.min_duration)
            })
        else setDurationMc({mins: 0, formatted: '-'})

        // staffingMc
        if (locality.mc_staffing)
            setStaffingMc(locality.mc_staffing > 0 ? 1 : 0)
        else setStaffingMc(-1)

        // medical center facility
        if (locality.min_facility_distance) {
            let dist = locality.min_facility_distance
            let formattedDist = distKm(dist)
            setMinDistKmMcf(formattedDist)
        } else setMinDistKmMcf("0")

        // medical center durationMc
        if (locality.min_facility_duration)
            setDurationMcf({
                mins: locality.min_facility_duration / 60,
                formatted: formatTimeDifference(locality.min_facility_duration)
            })
        else setDurationMcf({mins: 0, formatted: '-'})

    }, [locality])


    return (
        <div className="item">
            <div className="item__title" onClick={(e) => {
                onLocalityTitleClick(e, locality)
            }}>
                <div className="link">{locality.locality_name}</div>
            </div>

            <div className="mt-1">
                {locality.population_population_adult} чел.
            </div>
            <div className="item__body">

                {/* мед учреждение*/}
                <div onClick={(e) => {
                    onMedicalCenterClick(e, locality, true)
                }} className="link-neutral">
                    {/* информация о км и времени до ближайшего мед учреждения */}
                    <b>ФАП: </b>
                    <span
                        className={"accent-4 white-text crumb " + (durationMc.mins < 10 ? "teal" : (durationMc.mins < 20 ? "yellow" : "red"))}>
                    {durationMc.formatted}, {minDistKmMc} км.  &rarr;  </span>
                    {/*имя мед учреждения */}
                    {locality.medical_center_name}
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
                            onMedicalCenterClick(e, locality, false)
                        }} className="link">
                            <b>ЦРБ: </b>
                            {/* информация о км и времени до ближайшего мед учреждения */}
                            <span
                                className={"accent-4 white-text crumb " + (durationMcf.mins < 20 ? "teal" : (durationMcf.mins < 30 ? "yellow" : "red"))}>
                                {durationMcf.formatted}, {minDistKmMcf} км.  &rarr;  </span>
                            {/*имя мед учреждения */}
                            {locality.mcf_name}
                        </div>
                    </BtnMore>
                </div>
            </div>
        </div>
    )
}
