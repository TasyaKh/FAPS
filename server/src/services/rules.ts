import {Engine, RuleProperties} from "json-rules-engine";
import {ConditionsLocalityDto} from "../dto/conditions_locality.dto";

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

    public setConditions(cLD:ConditionsLocalityDto): void {
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
                    type: `Необходимо построить МП так как большое расстояние до ближайшего МП > ${this.minDistanceKm}`,
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
                    type: `Нам нужен доктор в медицинском учреждении, так как население > ${this.minPopulationForFAP}, а состав персонала = ${this.staffCompositionForDoctor}`,
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
                    type: `Необходимо улучшить тип МП до Амбулатории или больницы, так как население в НП-е МП-а > 
            ${this.minPopulationForAmbulance} и стоит ${this.FAP}`,
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
                    type: `Необходимо построить МП (Амбулатория или больница), так как население > ${this.minPopulationForAmbulance} и нет МП`,
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
                    type: `Необходимо понизить тип МП до ФАПА т.к население < ${this.minPopulationForAmbulance}`,
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
                    type: `МП не требуется так как число людей в НП <= ${this.minPopulationForFAP}`,
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

        let res: string[] = []
        // Run the engine with the facts
        await this.engine
            .run(this.facts)
            .then((results) => {
                if (results.events.length > 0) {
                    results.events.map((event) => res.push(event.type));
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
