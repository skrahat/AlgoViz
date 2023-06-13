//import { bubbleSort } from '../../component/Algorithms';

interface State {
    result: number[];
    displayComplete: boolean;
    sortInProgess: boolean;
    iterationsCompleted: number;
}

const initialState: State = {
    result: [],
    displayComplete: true,
    sortInProgess: false,
    iterationsCompleted: 0
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
                displayComplete: true
            };
        case 'ITERATIONS_COMPLETED':
            if (action.payload.clean === true)
                return { ...state, iterationsCompleted: 0 };
            return {
                ...state,
                iterationsCompleted: state.iterationsCompleted + 1
            };
        case 'SORT_IN_PROGRESS':
            return { ...state, sortInProgess: !state.sortInProgess };
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
