export const generateNumbersAction = (arraySize: number) => {
    //console.log('generateNumbers action reached');
    return {
        type: 'GENERATE_NUMBERS',
        payload: arraySize
    };
};
export const sortInProgressAction = (status: boolean) => {
    //console.log('sortInProgess action reached');
    return {
        type: 'SORT_IN_PROGRESS',
        payload: status
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

export const iterationsCompletedAction = (clean: boolean, choice?: number) => {
    return {
        type: 'ITERATIONS_COMPLETED',
        payload: { clean: clean, choice: choice }
    };
};
export const sortNumbersBubbleAction = (newArray: number[]) => {
    //console.log('SORT_NUMBERS_BUBBLE action reached');

    return {
        type: 'SORT_NUMBERS_BUBBLE',
        payload: newArray
    };
};
export const sortNumbersInsertionAction = (newArray: number[]) => {
    //console.log('SORT_NUMBERS_INSERTION action reached');

    return {
        type: 'SORT_NUMBERS_INSERTION',
        payload: newArray
    };
};
