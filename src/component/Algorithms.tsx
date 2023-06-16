import {
    iterationsCompletedAction,
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortedActionAction
} from '../redux/reducers/actions';

export const BubbleSort = async (result: any, dispatch: any) => {
    console.log('started bubble sort');
    const newArray = [...result];
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray.length - 1; j++) {
            await timer(100);
            if (newArray[j] > newArray[j + 1]) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;
                const sortedArray = [...newArray]; // Create a copy of newArray
                dispatch(sortNumbersBubbleAction(sortedArray));
                dispatch(iterationsCompletedAction(false));
            }
        }
    }
    dispatch(sortInProgressAction());
    dispatch(sortedActionAction());
    console.log('ended bubble sort');
};
// Insertion Sort
export const InsertionSort = async (array: number[], dispatch: any) => {
    const newArray = [...array];
    const n = newArray.length;

    for (let i = 1; i < n; i++) {
        let current = newArray[i];
        let j = i - 1;

        while (j >= 0 && newArray[j] > current) {
            newArray[j + 1] = newArray[j];
            const sortedArray = [...newArray]; // Create a copy of newArray
            dispatch(sortNumbersInsertionAction(sortedArray));
            dispatch(iterationsCompletedAction(false));
            await timer(100);
            j--;
        }

        newArray[j + 1] = current;
    }
    dispatch(sortInProgressAction());
    dispatch(sortedActionAction());
    console.log('ended bubble sort');
};

// delay timer function
async function timer(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
