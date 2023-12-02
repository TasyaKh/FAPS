import {Engine, RuleProperties} from "json-rules-engine";

export class RuleEngine {
    // default params for rules
    minDistanceKm: number = 10
    minPopulationForFAP: number = 100
    maxPopulationForFAP: number = 2000
    staffCompositionForDoctor: number = 0
    FAP: string = "ФАП"
    Ambulance: string = "Амбулатория"
    Hospital: string = "Больница"
    facts: { population: number; staffComposition: number; facilityType: string, distanceMc: number }

    // Initialize the rules engine
    engine: Engine;
    // Some error occurred
    err: any;

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
                            fact: "population",
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
                            fact: "population",
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
                    type: `Нам нужен доктор в медицинском учреждении, так как население > 
            ${this.minPopulationForFAP}, а состав персонала = ${this.staffCompositionForDoctor}`,
                },
            },
            //  ****************************************************************************************************
            // тип МП до Амбулатории или больницы
            {
                conditions: {
                    all: [
                        {
                            fact: "population",
                            operator: "greaterThan",
                            value: this.maxPopulationForFAP,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: this.FAP,
                        },
                    ],
                },
                event: {
                    type: `Необходимо улучшить тип МП до Амбулатории или больницы, так как население > 
            ${this.maxPopulationForFAP} и стоит ${this.FAP}`,
                },
            },
            //  ****************************************************************************************************
            // Необходимо построить МП (Амбулатория или больница)
            {
                conditions: {
                    all: [
                        {
                            fact: "population",
                            operator: "greaterThan",
                            value: this.maxPopulationForFAP,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: true,
                        },
                    ],
                },
                event: {
                    type: `Необходимо построить МП (Амбулатория или больница), так как население > ${this.maxPopulationForFAP} и нет МП`,
                },
            },
            //  ****************************************************************************************************
            // Необходимо понизить тип МП до ФАПА
            {
                conditions: {
                    all: [
                        {
                            fact: "population",
                            operator: "lessThanInclusive",
                            value: this.maxPopulationForFAP,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: this.Ambulance,
                        },
                    ],
                },
                event: {
                    type: `Необходимо понизить тип МП до ФАПА т.к население < ${this.maxPopulationForFAP}`,
                },
            },
            //  ****************************************************************************************************
            // МП не требуется так как число людей в НП <= 100 и ФАП есть
            {
                conditions: {
                    all: [
                        {
                            fact: "population",
                            operator: "lessThanInclusive",
                            value: this.minPopulationForFAP,
                        },
                        {
                            fact: "facilityType",
                            operator: "equal",
                            value: this.FAP,
                        },
                    ],
                },
                event: {
                    type: `МП не требуется так как число людей в НП <= ${this.minPopulationForFAP} (ФАП есть)`,
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
