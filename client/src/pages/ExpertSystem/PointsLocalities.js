import React, { useCallback, useEffect, useState, Component, useRef } from 'react'
import { useHttp } from 'hooks/http.hook'
import { Button, ProgressBar } from 'react-materialize'
import { FilterPointsLocalities } from 'components/ExpertSystem/FilterPoints'
import './PointsLocalities.scss'
import { TablePoints } from 'components/ExpertSystem/TablePoints'
import { PointsPanel } from 'components/ExpertSystem/PointsPanel'

export const PointsLocalities = () => {

    const { loading, error, request, clearError } = useHttp()

    const [state, setState] = useState({
        modified: [],
        isFaps: false,
    })

    const [pointsCalculatorState, setPointsCalculatorState] = useState({
        show: false
    })

    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])


    const updateData = (value, faps) => {

        setState({
            modified: value,
            isFaps: faps
        })

    }

    const handlePointsCalculatorButtonClick = () => {
        setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })

    }

    const handlePointsCalculatorHide = () => {
        setPointsCalculatorState({ ...pointsCalculatorState, 'show': !pointsCalculatorState.show })
    }

    return (
        <div className="view">


            <div className="container">

                <div className='container__filter'>
                    <FilterPointsLocalities
                        updateData={updateData}

                    />
                </div>
                <Button
                    className="navigation__button blue darken-4 btn navigation__link"
                    node="button"
                    waves="light"
                    onClick={handlePointsCalculatorButtonClick}
                ><i className="material-icons right">settings</i>
                    Калькулятор баллов
                </Button>

                <div className="table-container">

                    {
                        loading ? <ProgressBar /> :
                            state.modified.length === 0 ? 'Элементов не найдено, пожалуйста, измените критерии поиска' :
                                <TablePoints
                                    data={state.modified}
                                    isFaps={state.isFaps}
                                />

                    }

                </div>

                {pointsCalculatorState.show &&
                    <PointsPanel
                        hide={handlePointsCalculatorHide}
                        closeModal={handlePointsCalculatorButtonClick}
                        pointsButtonVisible={false}
                        area={undefined}
                    />
                }
            </div>

        </div>
    )
}


