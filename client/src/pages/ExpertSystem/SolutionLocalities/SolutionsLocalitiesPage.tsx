import React, {useState} from 'react'
import {Button, Icon, ProgressBar} from 'react-materialize'
import './SolutionsLocalitiesPage.scss'
import {TableSolutions} from 'components/ExpertSystem/TableSolutions'
import {SelectArea} from "../../../components/FAPS/SelectArea";
import {ConditionsLocality} from "../../../components/ExpertSystem/Modals/Calculators/ConditionsLocality";
import {DefaultModal} from "../../../components/ExpertSystem/Modals/TemplateModal";
import {useQuery} from "react-query";
import {getSolutionsLocalities} from "../../../api/points";
import {Order} from "../../../enums";
import {ILocalitiDistToNearectMC} from "../../../entities/entities";

export const SolutionsLocalitiesPage = () => {

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
        error: solutionsError,
        isLoading: solutionsLoading,
        refetch: refetchSolutions
    } = useQuery(['getSolutionsLocalities', filters], () => getSolutionsLocalities(filters));


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {target} = e
        const {name} = target
        const value = parseInt(target.value)

        setFilters({...filters, [name]: !isNaN(value) ? value !== 0 ? value : null : null})
    }

    const handleInstallExcel = () => {

    }

    const handleSetConditionsLocalities = () => {
        refetchSolutions()
    }


    const handleConditionsModalHide = (show: boolean) => {
        setConditionsModalState({show: show})
    }

    const handleFilterStateChanged = (orderState: Order, filterName: string, prevFilterName: string) => {
        // console.log(filters)
        // console.log("defa ", filterName, orderState)
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
                {conditionsModalState.show &&
                    <DefaultModal header={"Условия для НП-ов"}
                                  child={<ConditionsLocality onSaveConditionsData={handleSetConditionsLocalities}/>}
                                  onHide={handleConditionsModalHide}>

                    </DefaultModal>
                }
            </div>

        </div>
    )
}


