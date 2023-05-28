import React, { useCallback, useEffect, useState } from 'react'
import './PointsPanel.scss'
import { CollapsibleItem, Collapsible, Button, Select, ProgressBar } from "react-materialize"
import { useHttp } from "../../hooks/http.hook"
// import {ReportView} from "./ReportView"
import { PointsCalculator } from "./PointsCalculator"
import { Link } from 'react-router-dom'

export const PointsPanel = (/** @type {{ hide: React.MouseEventHandler<HTMLButtonElement>; pointsButtonVisible: Boolean; area: any; closeModal: any; }} */
 props) => {

  const [state, setState] = useState({
    columns: [],
    conditions: []
  })
  const [data, setData] = useState({
    headers: [],
    objects: []
  })

  const { loading, error, request, clearError } = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])


  const handleReportButton = () => {
    setData({
      ...state,
      objects: []
    })

    setPoints(state)
  }

  const setPoints = useCallback(async (body) => {
    try {

      await request('/api/points', 'POST', body)
    } catch (e) { }
  }, [request])

  return (
    <div className={`points-panel shadow `}>

      <button
        className="points-panel__close"
        onClick={props.hide}
      >
        &#10006;
      </button>

      <div className="points-panel__wrapper">

        { props.pointsButtonVisible ?
          <Link to="/points-localities">

            <Button
              node="button"
              waves="light"
              className="blue darken-4"

            >
              Проcмотр баллов
            </Button>

          </Link>:null
        }

        <Collapsible
          className="points-panel__collapsible"
          accordion
        >

          <CollapsibleItem
            expanded
            header="Калькулятор баллов"
            node="div"
            className="points-panel__collapsible-item"
          >

            <PointsCalculator
              setParams={setState}
              area={props.area}
              params={state}
              handleReportButton={handleReportButton}
              // closeModal={props.closeModal}
            />
            {
              loading ? <ProgressBar /> : null

            }

          </CollapsibleItem>



        </Collapsible>

      </div>

    </div>
  )
}