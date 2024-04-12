import React, {useState} from 'react'
import {Button, Icon, Preloader} from 'react-materialize'
import '../Calculators.scss'
import {TableLocalities} from 'components/ExpertSystem/TablesCalculators/TableLocalities'
import {SelectArea} from "components/FAPS/SelectArea";
import {ConditionsLocality} from "components/ExpertSystem/Modals/Calculators/ConditionsLocality";
import {DefaultModal} from "components/ExpertSystem/Modals/TemplateModal";
import {useQuery} from "react-query";
import {getSolutionsLocalities} from "api/points";
import {Order} from "enums";
import {ILocalitiDistToNearectMC} from "types/types";
import {getExcelSolutionsLocalities} from "api/uploads";
import CustomScrollbars from "../../../../components/FAPS/CustomScrollbar";

export const CalculatorLocalitiesPage = () => {

    const [filters, setFilters] = useState<ILocalitiDistToNearectMC>({
        region_id: 1,
        district_id: 1,
        locality_name_order: Order.DEFAULT,
        population_population_adult_order: Order.DEFAULT,
        medical_center_name_order: Order.DEFAULT,
        mc_staffing_order: Order.DEFAULT,
        mc_type_name_order: Order.DEFAULT,
        min_distance_order: Order.DEFAULT,
        min_duration_order: Order.DEFAULT
    })

    const [conditionsModalState, setConditionsModalState] = useState({
        show: false
    })

    const {
        data: solutions,
        isLoading: solutionsLoading,
        refetch: refetchSolutions
    } = useQuery(['getSolutionsLocalities', filters],
        () => getSolutionsLocalities(filters),
    );

    const {
        // data: excelSolutions,
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
        <div className="">
            <div className="container__filter">
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

            {/* TablePoints */}
            <div style={{height: '100%', overflow:'scroll'}}>
                <TableLocalities
                    dataIsLoading={solutionsLoading}
                    data={solutions ?? []}
                    onFilterStateChanged={handleFilterStateChanged}/>
            </div>

            {/*modal ConditionsLocality */}
            <DefaultModal header={"Условия для НП-ов"}
                          child={<ConditionsLocality onSaveConditionsData={handleSetConditionsLocalities}/>}
                          onHide={handleConditionsModalHide}
                          show={conditionsModalState.show}
            />

        </div>
    )
}


