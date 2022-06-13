import { ReputationCriteria } from "../types/criteria"

export default {
    provider: "stackoverflow",
    parameters: [{ name: "reputation", type: "number" }],
    reputationLevels: [
        {
            name: "gold",
            rules: [
                {
                    parameter: "reputation",
                    value: {
                        ">": 1000
                    }
                }
            ]
        },
        {
            name: "silver",
            rules: [
                {
                    parameter: "reputation",
                    value: {
                        ">": 500
                    }
                }
            ]
        },
        {
            name: "bronze",
            rules: [
                {
                    parameter: "reputation",
                    value: {
                        ">": 100
                    }
                }
            ]
        }
    ]
} as ReputationCriteria
