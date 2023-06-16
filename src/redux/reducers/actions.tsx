export const generateNumbersAction = (arraySize: number) => {
    console.log('generateNumbers action reached');
    return {
        type: 'GENERATE_NUMBERS',
        payload: arraySize
    };
};
export const sortInProgressAction = () => {
    console.log('sortInProgess action reached');
    return {
        type: 'SORT_IN_PROGRESS'
    };
};
export const sortedAction = () => {
    console.log('sorted action reached');
    return {
        type: 'SORTED'
    };
};
export const iterationsCompletedAction = (clean: boolean) => {
    return {
        type: 'ITERATIONS_COMPLETED',
        payload: { clean: clean }
    };
};

export const sortNumbersBubbleAction = (
    unsortedArray: number[],
    sortedResultArray: number[]
) => {
    console.log('SORT_NUMBERS_BUBBLE action reached');

    return {
        type: 'SORT_NUMBERS_BUBBLE',
        payload: {
            unsortedArray: unsortedArray,
            sortedResultArray: sortedResultArray
        }
    };
};
export const sortNumbersInsertionAction = (newArray: number[]) => {
    console.log('SORT_NUMBERS_INSERTION action reached');

    return {
        type: 'SORT_NUMBERS_INSERTION',
        payload: newArray
    };
};
