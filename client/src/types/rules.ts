interface IMessagesColored {
    key: string,
    name: string,
    color: string
}

export const messages: IMessagesColored[] = [
    {
        key: "needFapFarDistance",
        name: 'Необходимо построить МП так как большое расстояние до ближайшего МП',
        color: '#ffc5c5'
    },
    {
        key: "needStaff",
        name: 'Нам нужен доктор в медицинском учреждении, так как население',
        color: '#dfffc6'
    },
    {
        key: "upgradeMCToHosp",
        name: 'Необходимо улучшить тип МП до Амбулатории или больницы, так как население в НП-е МП-а ',
        color: '#c6ffef'
    },
    {
        key: "needFapPopulation",
        name: 'Необходимо построить МП (Амбулатория или больница), так как нет МП и население ',
        color: '#e7c6ff'
    },
    {
        key: "downgradeMCtoFap",
        name: 'Необходимо понизить тип МП до ФАПА т.к население ',
        color: '#c8cfff'
    },
    {
        key: "noNeedFap",
        name: 'МП не требуется так как число людей в НП ',
        color: '#ffeec6'
    }
];
