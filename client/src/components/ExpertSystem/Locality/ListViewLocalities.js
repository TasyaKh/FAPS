import React from 'react'
import '../../FAPS/ListView/ListView.scss'
import {LocalityItem} from "./LocalityItem";

export const ListViewLocalities = (props) => {
    return (
        <div className="list-view">
            {!props.loading ? props.localities && props.localities.length > 0 ? props.localities.map((locality, i) => (

                        <LocalityItem
                            locality={locality}
                            key={i}
                            onLocalityTitleClick={props.onLocalityTitleClick}
                            onMedicalCenterClick={props.onMedicalCenterClick}
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
