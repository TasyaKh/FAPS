import React, {useEffect, useState, useCallback, useContext, FC} from 'react'
import {Button} from 'react-materialize'
import '../../FAPS/Navigation/Navigation.scss'
import {useHttp} from 'hooks/http.hook'
import {ELegend} from "../Legend/ELegend";
import {AuthContext} from "context/AuthContext";
import {roleHierarchy, Roles} from "roles";
import {AuthBtn} from "../../Elements/Buttons/BtnAuth/AuthBtn";
import {Link} from "react-router-dom";

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
                    {/*Калькулятор*/}
                    {roleHierarchy[role]?.includes(Roles.EXPERT) ?
                        <div className={'navigation__button navigation__link'}>
                            <Link to="/expert-system/solution-localities" className="auth-btn">
                                <Button
                                    className="grey darken-4 "
                                    node="button"
                                    waves="light"
                                >
                                    Калькулятор
                                </Button>
                            </Link></div> : null
                    }
                    <div className={'navigation__button navigation__link'}>
                        <AuthBtn/>
                    </div>
                </div>

                <div className="navigation__nav navigation__nav--bottom">
                    {/*legend*/}
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
