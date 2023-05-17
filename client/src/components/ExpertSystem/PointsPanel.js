import React, { useCallback, useEffect, useState } from 'react'
import './PointsCalculator.scss'
import { CollapsibleItem, Collapsible, Button, Select } from "react-materialize"
import { useHttp } from "../../hooks/http.hook"
// import {ReportView} from "./ReportView"
import { PointsCalculator } from "./PointsCalculator"

export const PointsPanel = (props) => {

  const [state, setState] = useState({
    columns: [],
    conditions: []
  })
  // const [data, setData] = useState({
  //   headers: [],
  //   objects: []
  // })

  const { loading, error, request, clearError } = useHttp()

  useEffect(() => {
    if (error) {
      console.log('Ошибка: ' + error)
    }
    clearError()
  }, [clearError, error])

  // const fetchData = useCallback(async (body) => {
  //   try {

  //     const fetched = await request('/api/reports', 'POST', body)

  //     setData(fetched)

  //   } catch (e) {}
  // }, [request])

  // const handleReportButton = () => {
  //   setData({
  //     ...state,
  //     objects: []
  //   })

  //   fetchData(state)
  // }


  return (
    <div className={`points-panel shadow ${props.className}`}>

      <button
        className="points-panel__close"
        onClick={props.hide}
      >
        &#10006;
      </button>

      <div className="points-panel__wrapper">

        <Collapsible
          className="points-panel__collapsible"
          accordion
        >
          <CollapsibleItem
            expanded={false}
            header="Придумать"
            node="div"
            className="points-panel__collapsible-item points-panel__collapsible-item--prepared"
          >

            Пусто
          </CollapsibleItem>

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
              // handleReportButton={handleReportButton}
              closeModal={props.closeModal}
            />

          </CollapsibleItem>

        </Collapsible>

      </div>

      {/* <ReportView
        loading={loading}
        data={data}
        parameters={state}
      /> */}

    </div>
  )
}