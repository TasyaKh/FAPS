import React, {useState} from 'react'
import {Button, Icon, Preloader} from 'react-materialize'
import '../Calculators.scss'
import {TableSolutions} from 'components/ExpertSystem/TableSolutions'
import {SelectArea} from "components/FAPS/SelectArea";
import {ConditionsLocality} from "components/ExpertSystem/Modals/Calculators/ConditionsLocality";
import {DefaultModal} from "components/ExpertSystem/Modals/TemplateModal";
import {useQuery} from "react-query";
import {getSolutionsLocalities} from "api/points";
import {Order} from "enums";
import {ILocalitiDistToNearectMC} from "types/types";
import {getExcelSolutionsLocalities} from "api/uploads";

export const CalculatorMCSPage = () => {

    const [filters, setFilters] = useState<ILocalitiDistToNearectMC>({
        region_id: 1,
        district_id: 1,
    })

    const [conditionsModalState, setConditionsModalState] = useState({
        show: false
    })

    const {
        data: solutions,
        error: solutionsError,
        isLoading: solutionsLoading,
        refetch: refetchSolutions
    } = useQuery(['getSolutionsMCS', filters],
        () => getSolutionsLocalities(filters),
    );

    const {
        // data: excelSolutions,
        error: excelSolutionsError,
        isLoading: excelSolutionsLoading,
        refetch: refetchExcelSolutions
    } = useQuery(['getExcelSolutionsLocalities'], () => getExcelSolutionsLocalities(filters), {
        enabled: false,
    });


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        setFilters({...filters, [name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleInstallExcel = () => {
        refetchExcelSolutions()
    }


    const handleSetConditionsLocalities = () => {
        setConditionsModalState({show: false})
        refetchSolutions()
    }


    const handleConditionsModalHide = (show: boolean) => {
        setConditionsModalState({show: show})
    }

    const handleFilterStateChanged = (orderState: Order, filterName: string, prevFilterName: string) => {
        // drop prev if needed
        let newFilters = {...filters, [filterName]: orderState}
        if (prevFilterName != filterName) {
            newFilters = {...newFilters, [prevFilterName]: Order.DEFAULT}
        }
        setFilters(newFilters)
    }
    return (
        <div className="view">
            {/*{Object.entries(filters).map(([key, value]) => (*/}
            {/*    <li key={key}>*/}
            {/*        <strong>{key}:</strong> {value}*/}
            {/*    </li>*/}
            {/*))}*/}
            <div className="container">

                <div className="container__filter">
                    <div className='row flex'>
                        <div className='col s12 m6'>
                            <SelectArea
                                // empty={true}
                                value={filters.district_id}
                                name="district_id"
                                onChange={handleSelectChange}
                                disabled={solutionsLoading}
                                label="Район:"
                                query="district"
                            />
                        </div>
                        <div className='col s12 m6 right-align'>
                            {excelSolutionsLoading ? <Preloader color={"blue"} size={"small"}/> : null}

                            <Button
                                className=""
                                onClick={handleInstallExcel}
                            >Скачать Excel</Button>
                        </div>
                    </div>

                </div>

                <div className="">
                    <Button
                        className="btn-floating"
                        icon={<Icon className=''>settings</Icon>}
                        onClick={() => handleConditionsModalHide(!conditionsModalState.show)}
                        tooltip={"Настроить условия"}
                        tooltipOptions={{position: "top"}}
                    />
                </div>
                <div className="mt-4"><b>НП-ы, рекомендации</b></div>
                {/* TablePoints */}

                <TableSolutions
                    dataIsLoading={solutionsLoading}
                    data={solutions ?? []}
                    onFilterStateChanged={handleFilterStateChanged}/>

                {/*modal ConditionsLocality */}
                <DefaultModal header={"Условия для НП-ов"}
                              child={<ConditionsLocality onSaveConditionsData={handleSetConditionsLocalities}/>}
                              onHide={handleConditionsModalHide}
                              show={conditionsModalState.show}
                />

            </div>

        </div>
    )
}

