"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleEngine = void 0;
const json_rules_engine_1 = require("json-rules-engine");
const messages = [
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
class RuleEngine {
    constructor() {
        // default conditions for rules
        this.minDistanceKm = 10;
        this.minPopulationForFAP = 100;
        this.minPopulationForAmbulance = 2000;
        this.staffCompositionForDoctor = 0;
        this.FAP = "ФАП";
        this.Ambulance = "Амбулатория";
        this.Hospital = "Больница";
    }
    setConditions(cLD) {
        var _a, _b, _c;
        this.minDistanceKm = (_a = cLD.min_dist_mc) !== null && _a !== void 0 ? _a : this.minDistanceKm;
        this.minPopulationForFAP = (_b = cLD.population_FAP) !== null && _b !== void 0 ? _b : this.minPopulationForFAP;
        this.minPopulationForAmbulance = (_c = cLD.population_Ambulatory) !== null && _c !== void 0 ? _c : this.minPopulationForAmbulance;
    }
    // create rules and conditions
    initializeRules() {
        this.engine = new json_rules_engine_1.Engine();
        // Rule definitions
        const rules = [
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
    runEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = [];
            // Run the engine with the facts
            yield this.engine
                .run(this.facts)
                .then((results) => {
                if (results.events.length > 0) {
                    results.events.map((event) => res.push({ key: event.type, name: event.params.message }));
                }
                // console.log(this.facts, results.events)
            })
                .catch((err) => {
                this.err = err;
                console.log("err", err);
            });
            return res;
        });
    }
}
exports.RuleEngine = RuleEngine;
//# sourceMappingURL=rules.js.map