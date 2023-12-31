import { colours } from '../../styling/colours';

interface State {
    results: { color: string; value: number }[][];
    sortInProgressArray: boolean[];
    displayComplete: boolean;
    sortInProgress: boolean;
    sorted: boolean;
    algoStop: boolean;
    generatedNumbers: { color: string; value: number }[];
}

const initialState: State = {
    results: [[], []],
    sortInProgressArray: [],
    displayComplete: true,
    sortInProgress: false,
    sorted: false,
    algoStop: false,
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
            return {
                ...state,
                results: [result, result],
                sortInProgressArray: [false, false],
                displayComplete: true,
                generatedNumbers: result
            };

        case 'SORT_IN_PROGRESS':
            const status = action.payload.status;
            const graphNumberProgress = action.payload.graphNumber;
            if (graphNumberProgress === 0) {
                return {
                    ...state,
                    sortInProgressArray: [status, state.sortInProgressArray[1]]
                };
            } else if (graphNumberProgress === 1) {
                return {
                    ...state,
                    sortInProgressArray: [state.sortInProgressArray[0], status]
                };
            } else
                return {
                    ...state,
                    sortInProgressArray: [status, status]
                };

        case 'SORTED':
            const sorted = action.payload;
            return { ...state, sorted: sorted };

        case 'START_BUBBLE_SORT':
            return {
                ...state,
                sortInProgressArray: [true, true],
                algoStop: false
            };

        case 'STOP_BUBBLE_SORT':
            return { ...state, algoStop: true };

        case 'SORT_NUMBERS_BUBBLE':
            const newArrayBubble = action.payload.newArray;
            const graphNumberbubble = action.payload.graphNumber;

            // This will replace the result at the specific index (graphNumber)
            const resultsbubble = state.results.map((result, index) =>
                index === graphNumberbubble ? newArrayBubble : result
            );

            return {
                ...state,
                results: resultsbubble,
                displayComplete: true
            };
        case 'SORT_NUMBERS_INSERTION':
            const newArrayInsertion = action.payload.newArray;
            const graphNumberInsertion = action.payload.graphNumber;

            // This will replace the result at the specific index (graphNumber)
            const resultsInsertion = state.results.map((result, index) =>
                index === graphNumberInsertion ? newArrayInsertion : result
            );

            return {
                ...state,
                results: resultsInsertion,
                displayComplete: true
            };
        case 'SORT_NUMBERS_MERGE':
            const newArrayMerge = action.payload.newArray;
            const graphNumberMerge = action.payload.graphNumber;

            // This will replace the result at the specific index (graphNumber)
            const resultsMerge = state.results.map((result, index) =>
                index === graphNumberMerge ? newArrayMerge : result
            );

            return {
                ...state,
                results: resultsMerge,
                displayComplete: true
            };
        default:
            return state;
    }
};

export default rootReducer;
