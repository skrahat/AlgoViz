import { bubbleSort } from '../../component/Algorithms';

interface State {
    result: number[];
    displayComplete: boolean;
}

const initialState: State = {
    result: [],
    displayComplete: true
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
        case 'SORT_NUMBERS':
            const array = state.result;
            const sortedArray = bubbleSort(array); // Use the sorting algorithm here
            return {
                ...state,
                result: sortedArray,
                displayComplete: true
            };
        default:
            return state;
    }
};

export default rootReducer;
