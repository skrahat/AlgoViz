export const generateNumbers = (arraySize: number) => {
    console.log('generateNumbers action reached');
    return {
        type: 'GENERATE_NUMBERS',
        payload: arraySize
    };
};
export const sortInProgess = () => {
    console.log('sortInProgess action reached');
    return {
        type: 'SORT_IN_PROGRESS'
    };
};
export const iterationsCompleted = (clean?: boolean) => {
    //console.log('iterationsCompleted action reached');
    return {
        type: 'ITERATIONS_COMPLETED',
        payload: clean
    };
};

export const sortNumbersBubble = (newArray: number[]) => {
    console.log('SORT_NUMBERS_BUBBLE action reached');

    return {
        type: 'SORT_NUMBERS_BUBBLE',
        payload: newArray
    };
};
export const sortNumbersInsertion = (newArray: number[]) => {
    console.log('SORT_NUMBERS_INSERTION action reached');

    return {
        type: 'SORT_NUMBERS_INSERTION',
        payload: newArray
    };
};
