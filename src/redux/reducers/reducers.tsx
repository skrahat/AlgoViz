//import { bubbleSort } from '../../component/Algorithms';

interface State {
    result: number[];
    sortedResultArray: number[];
    displayComplete: boolean;
    sortInProgess: boolean;
    sorted: boolean;
    iterationsCompleted: number;
    generatedNumbers: number[];
}

const initialState: State = {
    result: [],
    sortedResultArray: [],
    displayComplete: true,
    sortInProgess: false,
    sorted: false,
    iterationsCompleted: 0,
    generatedNumbers: []
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'GENERATE_NUMBERS':
            const arraySize = action.payload;
            const result = [];
            for (let counter = 0; counter < arraySize; counter++) {
                const randomNumber = parseFloat(
                    (Math.random() * 100).toFixed(0)
                );
                result.push(randomNumber);
            }
            return {
                ...state,
                result: result,
                sortedResultArray: [],
                displayComplete: true,
                generatedNumbers: result
            };
        case 'ITERATIONS_COMPLETED':
            if (action.payload.clean === true) {
                console.log('ITERATIONS_COMPLETED payload: clean');
                return { ...state, iterationsCompleted: 0 };
            }
            return {
                ...state,
                iterationsCompleted: state.iterationsCompleted + 1
            };
        case 'SORT_IN_PROGRESS':
            return { ...state, sortInProgess: !state.sortInProgess };
        case 'SORTED':
            return { ...state, sorted: !state.sorted };
        case 'SORT_NUMBERS_BUBBLE':
            const unsortedArray = action.payload.unsortedArray;
            const sortedResultArray = action.payload.sortedResultArray;
            return {
                ...state,
                result: unsortedArray,
                sortedResultArray: [
                    ...sortedResultArray,
                    ...state.sortedResultArray
                ], // Create a new array by spreading the existing sortedResultArray and adding the new value
                displayComplete: true
            };
        // case 'SORT_RESULT_ARRAY':
        //     const sortedResultArray = action.payload;
        //     return {
        //         ...state,
        //         result: arrayBubble,
        //         sortedResultArray: sortedResultArray,
        //         displayComplete: true
        //     };
        case 'SORT_NUMBERS_INSERTION':
            const arrayInsertion = action.payload;
            return {
                ...state,
                result: arrayInsertion,
                displayComplete: true
            };
        default:
            return state;
    }
};

export default rootReducer;
