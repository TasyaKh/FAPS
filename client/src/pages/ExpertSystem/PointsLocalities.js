import React, { useCallback, useEffect, useState, Component, useRef } from 'react'
import { useHttp } from 'hooks/http.hook'
import Scrollbars from 'react-custom-scrollbars'
import { ProgressBar } from 'react-materialize'
import { FilterPointsLocalities } from 'components/ExpertSystem/FilterPoints'
import './PointsLocalities.scss'
import { TableMC } from 'components/ExpertSystem/TableMC'

export const PointsLocalities = () => {

    const { loading, error, request, clearError } = useHttp()

    const [state, setState] = useState({
        modified: [],
        isFaps: false,
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


    return (
        <div className="view">

            <CustomScrollbars>

                <div className="container">
                    <FilterPointsLocalities
                        updateData={updateData}
                    />


                    <div className="table-container">

                        {
                            loading ? <ProgressBar /> :
                                state.modified.length === 0 ? 'Элементов не найдено, пожалуйста, измените критерии поиска' :
                                    <TableMC
                                        data={state.modified}
                                        isFaps={state.isFaps}
                                    />

                        }

                    </div>
                </div>

            </CustomScrollbars>

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


