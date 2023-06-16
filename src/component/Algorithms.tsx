import {
    iterationsCompletedAction,
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortedAction
} from '../redux/reducers/actions';

export const BubbleSort = async (
    result: number[],
    sortedResultArray: number[],
    dispatch: any
) => {
    console.log('started bubble sort');
    const newArray = [...result];
    const len = newArray.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            await timer(100);
            if (newArray[j] > newArray[j + 1]) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;
                const unsortedArray = [...newArray]; // Create a copy of newArray
                dispatch(
                    sortNumbersBubbleAction(
                        [...unsortedArray],
                        [...sortedResultArray]
                    )
                );
                dispatch(iterationsCompletedAction(false));
            }
        }

        // Move the last sorted element to the completedArray
        const updatedSortedResultArray = [
            newArray[len - 1 - i],
            ...sortedResultArray
        ];
        newArray.splice(len - 1 - i, 1);
        dispatch(
            sortNumbersBubbleAction([...newArray], updatedSortedResultArray)
        );
    }

    dispatch(sortInProgressAction());
    dispatch(sortedAction());
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
    dispatch(sortedAction());
    console.log('ended bubble sort');
};

// delay timer function
async function timer(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
