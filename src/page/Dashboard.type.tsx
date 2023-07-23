type SortingFunction = (
    stopControllerRef: AbortController,
    graphNumber: number
) => Promise<void>;

interface SortingFunctions {
    [key: string]: SortingFunction;
}
