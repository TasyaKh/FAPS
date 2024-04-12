import React, {type FC, useEffect, useState} from 'react'
import {IPointsMedicalCenter} from "types/types";
import './ConditionsLocality.scss'
import {useMutation, useQuery} from "react-query";
import {getPointsMedicalCenters, setPointsMedicalCenters} from "api/points";
import {ProgressBar} from "react-materialize";
import {toast} from "../../../Elements/Toast/ToastManager";
import {AxiosError} from "axios";

interface PointsMCSProps {
    onSaveConditionsData: () => void;
}

export const PointsMCS:
    FC<PointsMCSProps> = ({
                              onSaveConditionsData: onSavePointsData
                          }) => {

    const {
        data: pointsMCS,
        error: condLocError,
        isLoading: condLocLoading,
    } = useQuery<IPointsMedicalCenter, AxiosError, IPointsMedicalCenter, string[]>(['pointsMCS'], () => getPointsMedicalCenters());

    const {
        mutateAsync,
    } = useMutation("setPointsMedicalCenter", (newData: IPointsMedicalCenter) =>
            setPointsMedicalCenters(newData), {
            onSuccess: () => {
                onSavePointsData()
            },
            onError: (error) => {
            },
        }
    );

    const [formData, setFormData] = useState<IPointsMedicalCenter>({});

    useEffect(() => {
        if (pointsMCS) {
            setFormData(pointsMCS);
        }
    }, [pointsMCS]);

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


    useEffect(() => {
        if (condLocError)
            toast.show({
                content: condLocError.response?.data?.toString() ?? condLocError.message,
                type: 'error'
            });
    }, [condLocError]);

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
                                За взрослого (1 чел.):
                                <input
                                    type="number"
                                    name="adult_population"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.adult_population}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s12">
                            <label>
                                За ребенка (1 чел.):
                                <input
                                    type="number"
                                    name="child_population"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.child_population}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s6">
                            <label>
                                Укомплектованность:
                                <input
                                    type="number"
                                    name="staffing"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.staffing}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s6">
                            <label>
                                За каждый % неукомплектованности:
                                <input
                                    type="number"
                                    name="each_pers_staffing"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.each_pers_staffing}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s6">
                            <label>
                                Возраст здания:
                                <input
                                    type="number"
                                    name="foundation_year"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.foundation_year}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className="col s6">
                            <label>
                                Если превышено (лет):
                                <input
                                    type="number"
                                    name="max_found_year"
                                    min={0}
                                    max={100_000_000}
                                    className={"input-number"}
                                    defaultValue={formData.max_found_year}
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
