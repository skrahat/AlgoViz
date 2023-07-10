//import { bubbleSort } from '../../component/Algorithms';
import { colours } from '../../styling/colours';

interface State {
    resultOne: { color: string; value: number }[];
    resultTwo: { color: string; value: number }[];

    displayComplete: boolean;
    sortInProgess: boolean;
    sorted: boolean;
    algoStop: boolean;
    iterationsCompleted: number;
    generatedNumbers: { color: string; value: number }[];
}

const initialState: State = {
    resultOne: [],
    resultTwo: [],
    displayComplete: true,
    sortInProgess: false,
    sorted: false,
    algoStop: false,
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
                result.push({ color: colours.accent, value: randomNumber });
            }
            const resultOne = result;
            const resultTwo = result;

            return {
                ...state,
                resultOne,
                resultTwo,
                displayComplete: true,
                generatedNumbers: result
            };
        case 'ITERATIONS_COMPLETED':
            if (action.payload.clean === true) {
                //console.log('ITERATIONS_COMPLETED payload: clean');
                return { ...state, iterationsCompleted: 0 };
            }
            return {
                ...state,
                iterationsCompleted: state.iterationsCompleted + 1
            };
        case 'SORT_IN_PROGRESS':
            return { ...state, sortInProgess: !state.sortInProgess };
        case 'SORTED':
            const sorted = action.payload;
            return { ...state, sorted: sorted };
        case 'START_BUBBLE_SORT':
            return { ...state, sortInProgess: true, algoStop: false };

        case 'STOP_BUBBLE_SORT':
            return { ...state, algoStop: true };
        case 'SORT_NUMBERS_BUBBLE':
            const arrayBubble = action.payload;
            return {
                ...state,
                resultOne: arrayBubble,
                displayComplete: true
            };
        case 'SORT_NUMBERS_INSERTION':
            const arrayInsertion = action.payload;
            return {
                ...state,
                resultOne: arrayInsertion,
                displayComplete: true
            };
        default:
            return state;
    }
};

export default rootReducer;
