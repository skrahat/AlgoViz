//import { bubbleSort } from '../../component/Algorithms';
import { colours } from '../../styling/colours';

interface State {
    resultOne: { color: string; value: number }[];
    resultTwo: { color: string; value: number }[];

    displayComplete: boolean;
    sortInProgress: boolean;
    sorted: boolean;
    algoStop: boolean;
    iterationsCompleted: number[];
    generatedNumbers: { color: string; value: number }[];
}

const initialState: State = {
    resultOne: [],
    resultTwo: [],
    displayComplete: true,
    sortInProgress: false,
    sorted: false,
    algoStop: false,
    iterationsCompleted: [0, 0],
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
                return { ...state, iterationsCompleted: [0, 0] };
            }

            const { choice } = action.payload;
            const iterationsCompleted = [...state.iterationsCompleted];

            if (choice === 0) {
                iterationsCompleted[0] += 1;
            } else if (choice === 1) {
                iterationsCompleted[1] += 1;
            }

            return { ...state, iterationsCompleted };

        case 'SORT_IN_PROGRESS':
            const status = action.payload;

            return { ...state, sortInProgress: status };
        case 'SORTED':
            const sorted = action.payload;
            return { ...state, sorted: sorted };
        case 'START_BUBBLE_SORT':
            return { ...state, sortInProgress: true, algoStop: false };

        case 'STOP_BUBBLE_SORT':
            return { ...state, algoStop: true };
        case 'SORT_NUMBERS_BUBBLE':
            const arrayBubble = action.payload.newArray;
            const graphNumberBubble = action.payload.graphNumber;
            if (graphNumberBubble === 0)
                return {
                    ...state,
                    resultOne: arrayBubble,
                    displayComplete: true
                };
            return {
                ...state,
                resultTwo: arrayBubble,
                displayComplete: true
            };
        case 'SORT_NUMBERS_INSERTION':
            const arrayInsertion = action.payload.newArray;
            const graphNumberInsertion = action.payload.graphNumber;
            if (graphNumberInsertion === 0)
                return {
                    ...state,
                    resultOne: arrayInsertion,
                    displayComplete: true
                };
            return {
                ...state,
                resultTwo: arrayInsertion,
                displayComplete: true
            };
        default:
            return state;
    }
};

export default rootReducer;
