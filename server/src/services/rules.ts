import {Engine, RuleProperties} from "json-rules-engine";
import {ConditionsLocalityDto} from "../dto/conditions_locality.dto";

export interface IMessages {
    key: string,
    name: string
}

const messages: IMessages[] = [
    {
        key: "needFapFarDistance",
        name: 'Необходимо построить МП так как большое расстояние до ближайшего МП '
    },
    {
        key: "needStaff",
        name: 'Нам нужен доктор в медицинском учреждении, так как население '
    },
    {
        key: "upgradeMCToHosp",
        name: 'Необходимо улучшить тип МП до Амбулатории или больницы, так как население в НП-е МП-а '
    },
    {
        key: "needFapPopulation",
        name: 'Необходимо построить МП (Амбулатория или больница), так как нет МП и население '
    },
    {
        key: "downgradeMCtoFap",
        name: 'Необходимо понизить тип МП до ФАПА т.к население '
    },
    {
        key: "noNeedFap",
        name: 'МП не требуется так как число людей в НП '
    }
];


export class RuleEngine {
    // default conditions for rules
    minDistanceKm: number = 10
    minPopulationForFAP: number = 100
    minPopulationForAmbulance: number = 2000
    staffCompositionForDoctor: number = 0
    FAP: string = "ФАП"
    Ambulance: string = "Амбулатория"
    Hospital: string = "Больница"
    facts: {
        staffComposition: number; facilityType: string, distanceMc: number, populationMC: number,
        populationNP: number,
    }

    // Initialize the rules engine
    engine: Engine;
    // Some error occurred
    err: any;

    public setConditions(cLD: ConditionsLocalityDto): void {
        this.minDistanceKm = cLD.min_dist_mc ?? this.minDistanceKm
        this.minPopulationForFAP = cLD.population_FAP ?? this.minPopulationForFAP
        this.minPopulationForAmbulance = cLD.population_Ambulatory ?? this.minPopulationForAmbulance
    }

    // create rules and conditions
    public initializeRules(): void {
        this.engine = new Engine()
        // Rule definitions
        const rules: RuleProperties[] = [
            //  ****************************************************************************************************
            // Необходимо построить МП так как большое расстояние до ближайшего МП
            {
                conditions: {
                    all: [
                        {
                            fact: "distanceMc",
                            operator: "greaterThanInclusive",
                            value: this.minDistanceKm,
                        },
                        {
                            fact: "populationNP",
                            operator: "greaterThanInclusive",
                            value: this.minPopulationForFAP,
                        },

                    ],
                },

                event: {
                    type: messages[0].key,
                    params: {
                        message: messages[0].name + (' > ' + this.minDistanceKm)
                    }
                },
            },
            //  ****************************************************************************************************
            // Нам нужен доктор в медицинском учреждении
            {
                conditions: {
                    all: [
                        {
                            fact: "populationNP",
                            operator: "greaterThanInclusive",
                            value: this.minPopulationForFAP,
                        },
                        {
                            fact: "staffComposition",
                            operator: "equal",
                            value: this.staffCompositionForDoctor,
                        },
                    ],
                },
                event: {
                    type: messages[1].key,
                    params: {
                        message: messages[1].name + ('>' + this.minPopulationForFAP + ' а состав персонала = ' + this.staffCompositionForDoctor)
                    }
                },
            },
            //  ****************************************************************************************************
            // тип МП до Амбулатории или больницы
            {
                conditions: {
                    all: [
                        {
                            fact: "populationMC",
                            operator: "greaterThan",
                            value: this.minPopulationForAmbulance,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: this.FAP,
                        },
                    ],
                },
                event: {
                    type: messages[2].key,
                    params: {
                        message: messages[2].name + (' > ' + this.minPopulationForAmbulance + ' и стоит ' + this.FAP)
                    }
                },
            },
            //  ****************************************************************************************************
            // Необходимо построить МП (Амбулатория или больница)
            {
                conditions: {
                    all: [
                        {
                            fact: "populationMC",
                            operator: "greaterThan",
                            value: this.minPopulationForAmbulance,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: true,
                        },
                    ],
                },
                event: {
                    type: messages[3].key,
                    params: {
                        message: messages[3].name + (' > ' + this.minPopulationForAmbulance)
                    }
                },
            },
            //  ****************************************************************************************************
            // Необходимо понизить тип МП до ФАПА
            {
                conditions: {
                    all: [
                        {
                            fact: "populationMC",
                            operator: "lessThanInclusive",
                            value: this.minPopulationForAmbulance,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: this.Ambulance,
                        },
                    ],
                },
                event: {
                    type: messages[4].key,
                    params: {
                        message: messages[4].name + (' < ' + this.minPopulationForAmbulance)
                    }
                },
            },
            //  ****************************************************************************************************
            // МП не требуется так как число людей в НП <= 100 и ФАП есть
            {
                conditions: {
                    all: [
                        {
                            fact: "populationNP",
                            operator: "lessThanInclusive",
                            value: this.minPopulationForFAP,
                        },
                        // {
                        //     fact: "facilityType",
                        //     operator: "equal",
                        //     value: this.FAP,
                        // },
                    ],
                },
                event: {
                    type: messages[5].key,
                    params: {
                        message: messages[5].name + ('<=' + this.minPopulationForFAP)
                    }
                },
            },
        ];

        // Add the rules to the engine
        rules.forEach((rule) => {
            this.engine.addRule(rule);
        });
    }

    // execute engine
    public async runEngine() {

        let res: IMessages[] = []
        // Run the engine with the facts
        await this.engine
            .run(this.facts)
            .then((results) => {
                if (results.events.length > 0) {
                    results.events.map((event) => res.push({key: event.type, name: event.params.message}));
                }
                // console.log(this.facts, results.events)
            })
            .catch((err) => {
                this.err = err
                console.log("err", err)
            });
        return res
    }
}
