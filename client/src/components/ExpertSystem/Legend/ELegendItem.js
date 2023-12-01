import React from "react"
import "./ELegendItem.scss"

export const ElegendItem = (props) => {

    return (
        <div className="elegend-item__block">

            <div
                className="elegend-item__placemark"
                style={{backgroundImage:props.img}}
            />

            <div className="elegend-item__label">
                {props.name}
            </div>

        </div>

    )
}