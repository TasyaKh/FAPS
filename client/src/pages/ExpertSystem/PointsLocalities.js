import React, { useCallback, useEffect, useState, Component, useRef } from 'react'
import { ReportPanel } from 'components/ReportPanel'
import { TableView } from 'components/TableView'
import { useHttp } from 'hooks/http.hook'
import Scrollbars from 'react-custom-scrollbars'
import { ProgressBar } from 'react-materialize'
import { FilterPointsLocalities } from 'components/ExpertSystem/FilterPointsLocalities'
import './PointsLocalities.scss'
import { TableMC } from 'components/ExpertSystem/TableMC'

export const PointsLocalities = () => {

    const { loading, error, request, clearError } = useHttp()

    const [state, setState] = useState({
        modified: [],
        default: []
    })

    const [headers, setHeaders] = useState([])

    const [visibleReports, setVisibleReports] = useState(false)

    useEffect(() => {
        if (error) {
            console.log('Ошибка: ' + error)
        }
        clearError()
    }, [clearError, error])


    const reportViewRef = useRef()

    const handleReportsViewClick = (e) => {
        const { target } = e

        if (reportViewRef.current === target) {
            setVisibleReports(!visibleReports)
        }
    }

    const updateData = (value, force = false) => {

        setState({
            ...state,
            default: force ? value : state.default,
            modified: value
        })

     
    }

    return (
        <div className="view">


            <CustomScrollbars>
                <FilterPointsLocalities
                    updateData={updateData}
                />

                <div className="container table-container">

                    {
                        loading ? <ProgressBar /> :
                            state.modified.length === 0 ? 'Элементов не найдено, пожалуйста, измените критерии поиска' :
                                <TableMC
                                    data={state.modified}
                                    // headers={headers}
                                />

                    }

                </div>

            </CustomScrollbars>

            {visibleReports &&
                <div
                    className="view__reports"
                    ref={reportViewRef}
                    onClick={handleReportsViewClick}
                >

                    <ReportPanel
                        area={[]}
                        className="view__report-panel"
                        hide={() => setVisibleReports(false)}
                    />

                </div>
            }

        </div>
    )
}

class CustomScrollbars extends Component {
    render() {
        return (
            <Scrollbars
                renderView={props => <div {...props} className="view__scroll-view" />}>
                {this.props.children}
            </Scrollbars>
        );
    }
}