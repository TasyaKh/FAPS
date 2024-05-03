import React, {useState} from 'react'
import {Button, Icon, Preloader} from 'react-materialize'
import '../Calculators.scss'
import {SelectArea} from "components/FAPS/SelectArea";
import {DefaultModal} from "components/ExpertSystem/Modals/TemplateModal";
import {useQuery} from "react-query";
import {Order} from "enums";
import {getExcelSolutionsMCS} from "api/uploads";
import {TableMCS} from "components/ExpertSystem/TablesCalculators/TableMCS";
import {ISearchMedicalCenter} from "types/types-search";
import {PointsMCS} from "components/ExpertSystem/Modals/Calculators/PointsMCS";
import {getPointsSolutionMCS} from "api/points";

export const CalculatorMCSPage = () => {

    const [filters, setFilters] = useState<ISearchMedicalCenter>({
        region_id: 1,
        district_id: 1,
    })

    const [conditionsModalState, setConditionsModalState] = useState({
        show: false
    })

    const {
        data: solutions,
        isLoading: solutionsLoading,
        refetch: refetchSolutions
    } = useQuery(['getPointsSolutionsMCS', filters],
        () => getPointsSolutionMCS(filters),
    );

    const {
        isLoading: excelSolutionsLoading,
        refetch: refetchExcelSolutions
    } = useQuery(['getExcelSolutionsMCS'], () => getExcelSolutionsMCS(filters), {
        enabled: false,
    });

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        setFilters({...filters, [name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleInstallExcel = () => {
        refetchExcelSolutions().then(r => {})
    }

    const handleSetPointsMCS = () => {
        setConditionsModalState({show: false})
        refetchSolutions().then(r => {})
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
        <div className="">
            <div className="container__filter">
                {/* tools */}
                <div className='row flex'>
                    <div className='col s12 m6'>
                        <SelectArea
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
                        > Скачать Excel </Button>
                    </div>
                </div>
            </div>

            {/*floating btn*/}
            <div className="">
                <Button
                    className="btn-floating"
                    icon={<Icon className=''>settings</Icon>}
                    onClick={() => handleConditionsModalHide(!conditionsModalState.show)}
                    tooltip={"Настроить условия"}
                    tooltipOptions={{position: "top"}}/>
            </div>
            {/* TablePoints */}
            <TableMCS
                dataIsLoading={solutionsLoading}
                data={solutions ?? []}
                onFilterStateChanged={handleFilterStateChanged}/>

            {/*modal ConditionsLocality */}
            <DefaultModal header={"Баллы МП-ы"}
                          child={<PointsMCS onSaveConditionsData={handleSetPointsMCS}/>}
                          onHide={handleConditionsModalHide}
                          show={conditionsModalState.show}/>
        </div>
    )
}


