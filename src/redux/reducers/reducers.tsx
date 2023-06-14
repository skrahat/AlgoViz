//import { bubbleSort } from '../../component/Algorithms';

interface State {
    result: number[];
    displayComplete: boolean;
    sortInProgess: boolean;
    sorted: boolean;
    iterationsCompleted: number;
    generatedNumbers: number[];
}

const initialState: State = {
    result: [],
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
                result,
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
            const arrayBubble = action.payload;
            return {
                ...state,
                result: arrayBubble,
                displayComplete: true
            };
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
