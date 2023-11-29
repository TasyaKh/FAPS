import React from "react"
import "./Eelegend.scss"
import {ElegendItem} from "./ELegendItem";

export const Elegend = (props) => {

  const handleButtonCloseClick = () => {
    props.setShow()
  }

  return (
    <div className="elegend shadow">

      <div className="elegend__wrapper">

        <h5 className="elegend__title">
          Легенда карты:
        </h5>

       <ElegendItem />

      </div>

      <div className="elegend__controls">

        <button
          className="elegend__button elegend__button--close"
          onClick={handleButtonCloseClick}
        >
          &#10006;
        </button>

      </div>

    </div>
  )
}