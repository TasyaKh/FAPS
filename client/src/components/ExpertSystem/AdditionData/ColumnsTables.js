import React from "react"

export const columnsPointsLocalities =
{
    Header: 'Баллы НП-ов района',
    columns: [
        {
            Header: 'НП',
            accessor: 'name',
        },
        {
            Header: 'ПМСП',
            accessor: 'availability_PMSP',
        },

        {
            Header: 'СМП',
            accessor: 'availability_SMP',
        },
        {
            Header: 'Взрослое население',
            accessor: 'population_adult',
        },
        {
            Header: 'Детское население',
            accessor: 'population_child',
        },
        {
            Header: 'Водоснабжение',
            accessor: 'water_supply',
        },
        {
            Header: 'Канализация',
            accessor: 'sewerage',
        },
        {
            Header: 'Отопление',
            accessor: 'heating',
        },
        {
            Header: 'Интернет',
            accessor: 'internet',
        },
        {
            Header: 'Итог',
            accessor: 'sum',
        },
        {
            Header: 'Кол-во учреждений',
            accessor: 'count_mc',
        },
        {
            Header: 'Мин балл учреждений',
            accessor: 'min_sum_fap',
        },
    ],
}

export const columnsPointsMedicalCenters =
{
    Header: 'Баллы учреждений района',
    columns: [
        {
            Header: 'НП',
            accessor: 'locality_name',
        },
        {
            Header: 'Учреждение',
            accessor: 'mc_name',
        },
        {
            Header: 'Год основания',
            accessor: 'foundation_year',
        },

        {
            Header: 'Состояние',
            accessor: 'state',
        },
        {
            Header: 'Укомплектованность',
            accessor: 'staffing',
        },
        {
            Header: 'Изношенность',
            accessor: 'deteroation',
        },
        {
            Header: 'Итог',
            accessor: 'sum',
        },
    ],
}


