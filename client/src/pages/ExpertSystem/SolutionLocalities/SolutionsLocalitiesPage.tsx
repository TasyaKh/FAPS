import React, {useEffect, useState} from 'react'
import {Button, Icon, ProgressBar} from 'react-materialize'
import './SolutionsLocalitiesPage.scss'
import {TableSolutions} from 'components/ExpertSystem/TableSolutions'
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {fetchSolutionsLocalities} from "../../../store/slices/points";
import {SelectArea} from "../../../components/FAPS/SelectArea";
import {ICustomSolutionsLocalities} from "../../../entities/entities";

export const SolutionsLocalitiesPage = () => {

    const dispatch = useAppDispatch();
    const {data: solutions, loading: loadingS, error: errorS} = useAppSelector((state) => state.points);

    const [filters, setFilters] = useState({
        district_id: 1
    })

    useEffect(() => {
        getSolutionsLocalities()
    }, [filters]);

    const getSolutionsLocalities = () => {
        dispatch(fetchSolutionsLocalities(filters.district_id))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        setFilters({...filters, [name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleSetRulesConditions = () => {

    }

    const handleInstallExcel = () => {

    }

    return (
        <div className="view">

            <div className="container">

                <div className="container__filter">
                    <div className='row flex'>
                        <div className='col s12 m6'>
                            <SelectArea
                                // empty={true}
                                value={filters.district_id}
                                name="district_id"
                                onChange={handleSelectChange}
                                disabled={loadingS}
                                label="Район:"
                                query="district"
                            />
                        </div>
                        <div className='col s12 m6 right-align'>
                            <Button
                                className=""
                                onClick={handleInstallExcel}
                            >скачать Excel</Button>
                        </div>
                    </div>

                </div>

                <div className="">
                    <Button
                        className="btn-floating"
                        icon={<Icon className=''>settings</Icon>}
                        onClick={handleSetRulesConditions}
                    />
                </div>
                <div className="mt-4"><b>НП-ы, рекомендации</b></div>
                <div className="table-container">
                    {/* TablePoints */}
                    {
                        loadingS ? <ProgressBar/> :
                            errorS ? errorS :
                                <TableSolutions
                                    data={solutions as ICustomSolutionsLocalities[]}
                                />
                    }

                </div>

                {/*{pointsCalculatorState.show &&*/}
                {/*    <PointsPanel*/}
                {/*        hide={handlePointsCalculatorHide}*/}
                {/*        // closeModal={handlePointsCalculatorButtonClick}*/}
                {/*        pointsButtonVisible={false}*/}
                {/*        area={undefined}*/}
                {/*        handleCalculateButton = {handleCalculateButton}*/}
                {/*    />*/}
                {/*}*/}
            </div>

        </div>
    )
}


