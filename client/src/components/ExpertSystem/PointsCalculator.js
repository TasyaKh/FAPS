import React, { useCallback, useEffect, useState } from 'react'
import './PointsPanel'
import { Select, Button, TextInput} from "react-materialize"
import { useHttp } from "../../hooks/http.hook"
import { CollapsibleItem, Collapsible } from "react-materialize"
import magnifer from "../../img/magnifier.svg";
import {SelectArea} from "../SelectArea"

export const PointsCalculator = (props) => {

  const { loading, error, request, clearError } = useHttp()
  const [types, setTypes] = useState([])
  const [population, setPopulation] = useState([])
  const [staffing, setStaffing] = useState([])

  const handleTextareaBlur = (e) => {
    const { target } = e
    const { value, name } = target

    console.log({...props.params})
    props.setParams({
      ...props.params,
      [name]: !isNaN(parseInt(value)) ? parseInt(value) : null
    })
  }

  useEffect(() => {
    console.log(error)
    clearError()
  }, [clearError, error])

  const handleSelectChange = (e) => {
    const { target } = e
    const { name } = target
    const value = parseInt(target.value)

    props.setParams({
      ...props.params,
      [name]: !isNaN(parseInt(value)) ? parseInt(value) : null
    })
  }

  const handleReportParamClick = (e) => {
    const { target } = e
    const { value, checked } = target
    const { conditions } = props.params

    if (checked) {

      if (!conditions.includes(value)) {
        conditions.push(value)

        props.setParams({
          ...props.params,
          conditions
        })
      }
    } else {
      const index = conditions.indexOf(value)

      if (index > -1) {
        conditions.splice(index, 1)
      }
    }
  }

  return (
    <div className="points-builder points-panel__builder">

      <div className="points-panel__wrapper">

      <SelectArea
                empty={true}
                name="district_id"
                onChange={handleSelectChange}
                disabled={loading}
                label="Район:"
                query="district"
              />

        <div className="report-panel__block flex flex--between ">
          <div className="points-panel__block--half points-panel__block--wrap">
            <h4 className="points-panel__subtitle points-panel__subtitle--margin">
              Баллы
            </h4>
          </div>
          <div className="points-panel__block--half points-panel__block--wrap">
            <h4 className="points-panel__subtitle points-panel__subtitle--margin">
              Условия для начисления баллов
            </h4>
          </div>
        </div>

        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__points-adult"
            type="number"
            onBlur={handleTextareaBlur}
            name="pointsAdult"
            label="За взрослого (1 чел.)"
          />

          <TextInput
            id="points-panel__points-child"
            type="number"
            onBlur={handleTextareaBlur}
            name="pointsChild"
            label="За ребенка (1 чел.)"
          />
        </div>



        <div className="report-panel__block flex flex--between">
          <div className="points-panel__block--half points-panel__block--wrap">
            <TextInput
              id="points-panel__points-SMP"
              type="number"
              onBlur={handleTextareaBlur}
              name="pointsSMP"
              label="СМП"
            />
          </div>

          <div className="points-panel__block--half points-panel__block--wrap">
            <TextInput
              id="points-panel__SMP-km"
              type="number"
              onBlur={handleTextareaBlur}
              name="SMPKm"
              label="Если превышено (км)"
            />
          </div>
        </div>


        <div className="report-panel__block flex flex--between">
          <div className="points-panel__block--half points-panel__block--wrap">
            <TextInput
              id="points-panel__points-staffing"
              type="number"
              onBlur={handleTextareaBlur}
              name="pointsStaffing"
              label="Укомплектованность"
            />
          </div>

          <div className="points-panel__block--half points-panel__block--wrap">
            <TextInput
              id="points-panel__staffing-persent"
              type="number"
              onBlur={handleTextareaBlur}
              name="staffingPersent"
              label="За каждый % неукомплектованности"
            />
          </div>
        </div>



        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__points-state"
            type="number"
            onBlur={handleTextareaBlur}
            name="pointsState"
            label="Состояние"
          />
        </div>

      </div>



      <div className="report-panel__block flex flex--between">
        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__points-PMSP"
            type="number"
            onBlur={handleTextareaBlur}
            name="pointsPMSP"
            label="ПМСП"
          />
        </div>

        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__PMSP-km"
            type="number"
            onBlur={handleTextareaBlur}
            name="PMSPKm"
            label="Если превышено (км)"
          />
        </div>
      </div>


      <div className="report-panel__block flex flex--between">
        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__points-age"
            type="number"
            onBlur={handleTextareaBlur}
            name="pointsAge"
            label="Возраст здания"
          />
        </div>

        <div className="points-panel__block--half points-panel__block--wrap">
          <TextInput
            id="points-panel__age-years"
            type="number"
            onBlur={handleTextareaBlur}
            name="ageYears"
            label="Если превышено (лет)"
          />
        </div>
      </div>



      {/* deterioration */}
      <div className="points-panel__block--half points-panel__block--wrap">

        <Collapsible
          className="points-panel__collapsible-one-elem"
          accordion
        >
          <CollapsibleItem
            expanded={true}
            header="Изношенность"
            node="div"
            className="points-panel__collapsible-one-elem-item"
          >
            <TextInput
              id="points-panel__points-deteroation-good"
              type="number"
              onBlur={handleTextareaBlur}
              name="deteroationGood"
              label="0-20% (хорошее)"
            />
            <TextInput
              id="points-panel__deteroation-medium"
              type="number"
              onBlur={handleTextareaBlur}
              name="deteroationMedium"
              label="21-41%(удовл.)"
            />
            <TextInput
              id="points-panel__deteroation-bad"
              type="number"
              onBlur={handleTextareaBlur}
              name="deteroationBad"
              label="41-60% (неудовл.)"
            />
            <TextInput
              id="points-panel__deteroation-old"
              type="number"
              onBlur={handleTextareaBlur}
              name="deteroationOld"
              label="61-80% (ветхое)"
            />
            <TextInput
              id="points-panel__deteroation-unfit"
              type="number"
              onBlur={handleTextareaBlur}
              name="pointsUnfit"
              label="81-100% (неприг.)"
            />

          </CollapsibleItem>

        </Collapsible>
       
      </div>

      <div className="points-panel__controls">
        <Button
          node="button"
          waves="light"
          className="modal-trigger report-panel__control"
          href="#report-modal"
          onClick={props.handleReportButton}
        >
          Рассчитать
        </Button>


        <Button
          node="button"
          waves="light"
          className="red darken-3 points-panel__control points-panel__button--close"
          onClick={props.closeModal}
        >
          Закрыть
        </Button>
      </div>

    </div>
  )
}