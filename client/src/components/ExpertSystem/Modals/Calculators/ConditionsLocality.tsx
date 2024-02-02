import React, {type FC, useEffect, useState} from 'react'
import {IConditionsLocality} from "../../../../types/types";
import './ConditionsLocality.scss'
import {useMutation, useQuery} from "react-query";
import {getConditionsLocalities, setConditionsLocalities} from "../../../../api/points";
import {ProgressBar} from "react-materialize";

interface ConditionsLocalityProps {
    onSaveConditionsData: () => void;
}

export const ConditionsLocality:
    FC<ConditionsLocalityProps> = ({
                                       onSaveConditionsData
                                   }) => {

    const {
        data: condLoc,
        error: condLocError,
        isLoading: condLocLoading,
        refetch: refetchSolutions
    } = useQuery(['conditionsLocalities'], () => getConditionsLocalities(),);

    const {
        mutateAsync,
        isLoading: setCondLocLoading
    } = useMutation("setConditionsLocalities", (newData: IConditionsLocality) =>
            setConditionsLocalities(newData), {
            onSuccess: () => {
                onSaveConditionsData()
            },
            onError: (error) => {

            },
        }
    );

    const [formData, setFormData] = useState<IConditionsLocality>({});

    useEffect(() => {
        if (condLoc) {
            setFormData(condLoc);
        }
    }, [condLoc]);

    // Function to handle form field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        const min = 0
        const max = 100_000_000
        // Validate and set the age within the desired range
        let val = 0
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue) && intValue >= min && intValue <= max) {
            val = intValue
            // console.log(val)
        } else if (intValue < min) {
            val = min
        } else if (intValue > max) {
            val = max
        }

        setFormData({
            ...formData,
            [name]: val
        });
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutateAsync(formData)
    };

    return (
        <div className="elem">
            <div className="elem__body">
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        {condLocLoading ? <ProgressBar/> : null}
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <label>
                                Требуется построить “МП”, если ближайший МП больше(км):
                                <input
                                    type="number"
                                    name="min_dist_mc"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.min_dist_mc}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s12">
                            <label>
                                ФАП, если население больше
                                <input
                                    type="number"
                                    name="population_FAP"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.population_FAP}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s12">
                            <label>
                                Амбулатория, если население больше
                                <input
                                    type="number"
                                    name="population_Ambulatory"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.population_Ambulatory}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>

                    <br/>
                    <button className="my-2 btn waves-effect waves-light" type="submit"
                            name="action">Сохранить
                        <i className="material-icons right">check</i>
                    </button>
                </form>

            </div>
        </div>
    )
}
