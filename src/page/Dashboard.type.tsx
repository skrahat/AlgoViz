type SortingFunction = (
    stopControllerRef: AbortController,
    graphNumber: number
) => Promise<void>;

export type SortingFunctions = {
    [key: string]: SortingFunction;
};
