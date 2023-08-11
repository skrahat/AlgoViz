type SortingFunction = (
    stopControllerRef: AbortController,
    graphNumber: number
) => Promise<void>;
export type SortingAlgorithm = 'bubble' | 'merge' | 'insertion';

export type SortingFunctions = {
    [key: string]: SortingFunction;
};
