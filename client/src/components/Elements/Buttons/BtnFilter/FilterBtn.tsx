import {Icon} from "react-materialize";
import React, {FC, useEffect, useState} from 'react'
import './FilterBtn.scss'
import {Order} from "../../../../enums";

interface FilterBtnProps {
    name: string,
    stateDefault: Order,
    onStateChanged: (orderState: Order, filterName: string) => void;
}

export const FilterBtn: FC<FilterBtnProps> = ({
                                                  name,
                                                  stateDefault,
                                                  onStateChanged
                                              }) => {

    const [state, setState] = useState(Order.DEFAULT)

    useEffect(() => {
        setState(stateDefault)
    }, [stateDefault])

    const onStateChangeClick = () => {
        let newState = state
        switch (state) {
            case Order.DEFAULT:
                newState = Order.DESC
                break
            case Order.DESC:
                newState = Order.ASC
                break
            case Order.ASC:
                newState = Order.DEFAULT
                break
        }
        setState(newState)
        onStateChanged(newState, name)
    }

    return (
        <div className={""}>
            <div className={""}
                 onClick={(e) => {
                     onStateChangeClick()
                 }}
            >
                <Icon
                    className={"material-icons"}>{state == Order.DEFAULT ? "filter_list" : (state == Order.ASC ? "arrow_upward" : "arrow_downward")}</Icon>
            </div>
        </div>
    )
}