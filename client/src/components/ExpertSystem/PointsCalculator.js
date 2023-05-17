import React, { useCallback, useEffect, useState } from 'react'
import './PointsPanel'
import { Select, Button, Checkbox, TextInput } from "react-materialize"
import { useHttp } from "../../hooks/http.hook"

export const PointsCalculator = (props) => {

  const { loading, error, request, clearError } = useHttp()
  const [types, setTypes] = useState([])
  const [population, setPopulation] = useState([])
  const [staffing, setStaffing] = useState([])

  const handleTextareaBlur = (e) => {
    const { target } = e
    const { value, name } = target

    props.setParams({
      ...props.params,
      [name]: !isNaN(parseInt(value)) ? parseInt(value) : null
    })
  }

  useEffect(() => {
    console.log(error)
    clearError()
  }, [clearError, error])

  // const fetchTypes = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/api/address/type`, 'GET', null)

  //     setTypes(fetched)
  //   } catch (e) { }
  // }, [request])

  // const fetchStaffing = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/api/address/staffing`, 'GET', null)

  //     setStaffing(fetched)
  //   } catch (e) { }
  // }, [request])

  // const fetchPopulation = useCallback(async () => {
  //   try {
  //     const fetched = await request(`/api/address/population`, 'GET', null)

  //     setPopulation(fetched)
  //   } catch (e) { }
  // }, [request])

  // useEffect(() => {
  //   fetchTypes()
  //   fetchPopulation()
  //   fetchStaffing()
  // }, [fetchTypes])

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

        <h4 className="points-panel__subtitle points-panel__subtitle--margin">
          Баллы
        </h4>

        <div className="points-panel__block flex flex--between points-panel__block--mobile-width">
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
              id="points-panel__points-SMPKm"
              type="number"
              onBlur={handleTextareaBlur}
              name="SMPKm"
              label="Если превышено"
            />
          </div>

        </div>

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