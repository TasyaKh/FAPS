import {Icon} from "react-materialize";
import React, {useState} from 'react'
import './BtnMore.scss'

export const BtnMore = (props) => {

    const [expanded, setExpanded] = useState(false)

    const onMoreClick = (e) => {
        setExpanded(!expanded)
    }

    return (
        <div className={"see-more"}>
            <div className={"see-more__btn flex center-align"}
                 onClick={(e) => {
                     onMoreClick(e)
                 }}
            >
                больше <Icon className={"material-icons"}>{expanded ? "arrow_drop_up" : "arrow_drop_down"}</Icon>
            </div>
            {/*body*/}

                    <div className={"see-more__body " + ( expanded ?"is-visible":" ")}>
                        {props.children}
                    </div>

        </div>
    )
}