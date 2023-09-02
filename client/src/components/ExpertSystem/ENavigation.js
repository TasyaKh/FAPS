import React, { useEffect, useState, useCallback } from 'react'
import 'materialize-css'
import { Button } from 'react-materialize'
import './ENavigation.scss'
import { useHttp } from 'hooks/http.hook'
import { PointsPanel } from './PointsPanel'

export const ENavigation = (props) => {

  const { error, request, clearError } = useHttp()

  const [state, setState] = useState({
    area: []
  })

  const [reportState, setReportState] = useState({
    show: false
  })

  const [legendState, setLegendState] = useState({
    show: false
  })

  const [pointsCalculatorState, setPointsCalculatorState] = useState({
    show: false
  })


  const handlePointsCalculatorButtonClick = () => {
    setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })

    if (legendState.show) {
      setLegendState({ ...legendState, show: !legendState.show })
    }

    if (reportState.show) {
      setReportState({ ...reportState, show: !reportState.show })
    }

  }

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  const fetchData = useCallback(async () => {


  }, [request])


  const handlePointsCalculatorHide = () => {
    setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })
  }

  const handleButtonCloseClick = () => {
    props.setHiddenNavigation(!props.hiddenNavigation)

    if (props.hiddenNavigation)
      props.setHiddenSidebar(true)
  }

  useEffect(() => {
    fetchData().then(r => {})
  }, [])

  return (
    <div className={`navigation ${!props.hiddenNavigation && 'navigation--active'}`}>

      <div className="navigation__close">

        <button
          className={`navigation__button navigation__button--close ${!props.hiddenNavigation && 'navigation__button--active'}`}
          onClick={handleButtonCloseClick}
        >
          <span />
        </button>

      </div>

      <div className="navigation__wrapper">

        <div className="navigation__nav navigation__nav--top">

          <Button
            className="navigation__button blue darken-4 btn navigation__link"
            node="button"
            waves="light"
            onClick={handlePointsCalculatorButtonClick}
          ><i className="material-icons right">settings</i>
            Калькулятор баллов
          </Button>

        </div>

        <div className="navigation__nav navigation__nav--bottom">


          <div className="navigation__controls">

          {/* empty */}

          </div>

          {pointsCalculatorState.show &&
            <PointsPanel
              hide={handlePointsCalculatorHide}
              handleCalculateButton = {null}
              // area={state.area}
              closeModal={handlePointsCalculatorButtonClick}
              pointsButtonVisible={true}
              area={state.area}
              handleCalculateButton ={null}
            />
          }
        </div>

      </div>

    </div>
  )
}