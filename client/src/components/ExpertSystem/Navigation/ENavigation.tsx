import React, {useEffect, useState, useCallback, useContext, FC} from 'react'
import {Button, Dropdown} from 'react-materialize'
import '../../FAPS/Navigation/Navigation.scss'
import {useHttp} from 'hooks/http.hook'
import {ELegend} from "../Legend/ELegend";
import {AuthContext} from "../../../context/AuthContext";
import {roleHierarchy, Roles} from "../../../roles";
import {AuthBtn} from "../../Elements/Buttons/BtnAuth/AuthBtn";

interface ENavigationProps {
    hiddenNavigation: boolean
    setHiddenNavigation: (hidden: boolean) => void
    setHiddenSidebar: (hidden: boolean) => void
}

export const ENavigation: FC<ENavigationProps> = ({
                                                      hiddenNavigation,
                                                      setHiddenNavigation,
                                                      setHiddenSidebar
                                                  }) => {

    const {role} = useContext(AuthContext)

    const {error, request, clearError} = useHttp()

    const [reportState, setReportState] = useState({
        show: false
    })

    const [legendState, setLegendState] = useState({
        show: false
    })

    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])

    const fetchData = useCallback(async () => {


    }, [request])


    const handleButtonCloseClick = () => {
        setHiddenNavigation(!hiddenNavigation)

        if (hiddenNavigation)
            setHiddenSidebar(true)
    }

    const setLegendShowHandle = () => {
        setLegendState({...legendState, show: !legendState.show})
    }

    const handleLegendButtonClick = () => {
        setLegendState({...legendState, show: !legendState.show})

        if (reportState.show) {
            setReportState({...reportState, 'show': !reportState.show})
        }
    }

    useEffect(() => {
        fetchData().then(r => {
        })
    }, [])

    return (
        <div className={`navigation ${!hiddenNavigation && 'navigation--active'}`}>

            <div className="navigation__close">

                <button
                    className={`navigation__button navigation__button--close ${!hiddenNavigation && 'navigation__button--active'}`}
                    onClick={handleButtonCloseClick}
                >
                    <span/>
                </button>

            </div>

            <div className="navigation__wrapper">

                <div className="navigation__nav navigation__nav--top">

                    {roleHierarchy[role]?.includes(Roles.EXPERT) ?
                        <Dropdown
                            options={{
                                alignment: 'right',
                                coverTrigger: false,
                            }}
                            trigger={<Button
                                className="navigation__button blue darken-4 btn navigation__link"
                                node="button"
                                waves="light"
                            ><i className="material-icons right">settings</i>
                                Калькулятор
                            </Button>}
                        >
                            <a href="/expert-system/solution-localities">Калькулятор НП (простой) <i
                                className="material-icons right">arrow_forward</i></a>
                            <a href="#!">Калькулятор баллов МП <i className="material-icons right">arrow_forward</i></a>
                        </Dropdown> : null
                    }
                    <div className={'navigation__button navigation__link'}>
                        <AuthBtn/>
                    </div>
                </div>

                <div className="navigation__nav navigation__nav--bottom">


                    <div className="navigation__controls">
                        <Button
                            className=""
                            node="button"
                            waves="light"
                            onClick={handleLegendButtonClick}
                        >
                            Легенда
                        </Button>

                    </div>

                    {legendState.show &&
                        <ELegend
                            setShow={setLegendShowHandle}
                        />
                    }
                </div>

            </div>

        </div>
    )
}
