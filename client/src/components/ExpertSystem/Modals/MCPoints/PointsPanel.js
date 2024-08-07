import React, { useCallback, useEffect, useState } from 'react'
import '../ModalPanel.scss'
import { CollapsibleItem, Collapsible, Button, ProgressBar } from "react-materialize"
import { useHttp } from "../../../../hooks/http.hook"
import { PointsCalculator } from "./PointsCalculator"
import { Link } from 'react-router-dom'


export const PointsPanel = (/** @type {{ handleCalculateButton: (arg0: any) => void; hide: React.MouseEventHandler<HTMLButtonElement>; pointsButtonVisible: any; area: any; }} */ props) => {

  const [state, setState] = useState({
    columns: [],
    conditions: []
  })

  const { loading, error, request, clearError } = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])


  const handleCalculateButton = () => {
    // setData({
    //   ...state,
    //   objects: []
    // })

    setPoints(state)
  }

  const setPoints = useCallback(async (body) => {
    try {

      await request('/api/points.ts', 'POST', body)
      if(body.district_id &&  props.handleCalculateButton != null)
         props.handleCalculateButton(body)
    } catch (e) { }
  }, [request])

  return (
    <div className={`modal-panel shadow `}>

      <button
        className="points-panel__close"
        onClick={props.hide}
      >
        &#10006;
      </button>

      <div className="points-panel__wrapper">

        { props.pointsButtonVisible ?
          <Link to="/expert-system/points-localities">

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
              handleCalculateButton={handleCalculateButton}
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