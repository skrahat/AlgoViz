export const generateNumbersAction = (arraySize: number) => {
    //console.log('generateNumbers action reached');
    return {
        type: 'GENERATE_NUMBERS',
        payload: arraySize
    };
};
export const sortInProgressAction = (status: boolean, graphNumber: number) => {
    //console.log('sortInProgess action reached');
    return {
        type: 'SORT_IN_PROGRESS',
        payload: { status: status, graphNumber: graphNumber }
    };
};
export const sortedAction = (sorted: boolean) => {
    //console.log('sorted action reached');
    return {
        type: 'SORTED',
        payload: sorted
    };
};
export const startBubbleSortAction = (result: any, algoStop: any) => {
    return {
        type: 'START_BUBBLE_SORT',
        payload: { result, algoStop }
    };
};

export const stopBubbleSortAction = () => {
    return {
        type: 'STOP_BUBBLE_SORT'
    };
};

export const sortNumbersBubbleAction = (
    newArray: number[],
    graphNumber: number
) => {
    return {
        type: 'SORT_NUMBERS_BUBBLE',
        payload: { newArray: newArray, graphNumber: graphNumber }
    };
};
export const sortNumbersInsertionAction = (
    newArray: number[],
    graphNumber: number
) => {
    return {
        type: 'SORT_NUMBERS_INSERTION',
        payload: { newArray: newArray, graphNumber: graphNumber }
    };
};
export const sortNumbersMergeAction = (
    newArray: number[],
    graphNumber: number
) => {
    return {
        type: 'SORT_NUMBERS_MERGE',
        payload: { newArray: newArray, graphNumber: graphNumber }
    };
};
