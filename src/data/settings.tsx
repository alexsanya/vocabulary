export interface Config {
    triesBeforeCompletion: number;
    groupSize: number;
}

export default {
    triesBeforeCompletion: 5,
    groupSize: 15
} as Config;