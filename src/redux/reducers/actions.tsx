export const generateNumbers = (arraySize: number) => {
    return {
        type: 'GENERATE_NUMBERS',
        payload: arraySize
    };
};

export const sortNumbers = () => {
    return {
        type: 'SORT_NUMBERS'
    };
};
