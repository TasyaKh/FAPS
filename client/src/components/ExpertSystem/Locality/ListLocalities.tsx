import React, {FC} from 'react'
import '../../FAPS/ListView/ListView.scss'
import {LocalityItem} from "./LocalityItem";
import {ILocalitiDistToNearectMC, ILocality} from "../../../types/types";

interface Props {
    loading: boolean
    localities: ILocalitiDistToNearectMC[]
    onLocalityTitleClick: (e: any, localityAndMc: any) => void
    onMedicalCenterClick:  (e: any, localityAndMc: any, isMC: boolean) => void
}

export const ListLocalities: FC<Props> = ({
                                              loading,
                                              localities, onLocalityTitleClick, onMedicalCenterClick,
                                          }) => {

    return (
        <div className="list-view">
            {!loading ? localities && localities.length > 0 ? localities.map((locality, i) => (

                        <LocalityItem
                            locality={locality}
                            key={i}
                            onLocalityTitleClick={onLocalityTitleClick}
                            onMedicalCenterClick={onMedicalCenterClick}
                        />
                    )) :
                    <div className="list-view--empty">
                        Таких элементов не найдено
                    </div> :
                'loading 1'
            }
        </div>
    )
}
