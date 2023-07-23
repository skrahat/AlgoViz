import {
    iterationsCompletedAction,
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortedAction
} from '../redux/reducers/actions';
import { colours } from '../styling/colours';

export const BubbleSort = async (
    result: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    const newArray = [...result];
    const len = newArray.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            // Check if the abort signal is triggered
            if (signal.aborted) {
                const unsortedArray = newArray.map((item) => {
                    return { ...item, color: colours.accent };
                });
                dispatch(sortNumbersBubbleAction(unsortedArray, graphNumber));
                return;
            }

            if (newArray[j].value > newArray[j + 1].value) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;

                // Create a new sorted array with modified colors
                const sortedArray = newArray.map((item, index) => {
                    if (index === j || index === j + 1) {
                        if (item.color === '#f45050') {
                            return { ...item, color: colours.accent };
                        } else {
                            return { ...item, color: colours.error };
                        }
                    }
                    return item;
                });

                dispatch(sortNumbersBubbleAction(sortedArray, graphNumber));
                dispatch(iterationsCompletedAction(false, 0));
                await timer(len);
            }
        }
    }
    // Set the color of all elements to green to indicate the sorting is complete
    const sortedArray = newArray.map((item) => {
        return { ...item, color: colours.success };
    });

    dispatch(sortNumbersBubbleAction(sortedArray, graphNumber));

    dispatch(sortInProgressAction(false));
    dispatch(sortedAction(true));
};

export const InsertionSort = async (
    array: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    const newArray = [...array];
    const len = newArray.length;

    for (let i = 1; i < len; i++) {
        let current = newArray[i];
        let j = i - 1;

        while (j >= 0 && newArray[j].value > current.value) {
            if (signal.aborted) {
                //console.log('Insertion sort aborted');
                const unsortedArray = newArray.map((item) => {
                    return { ...item, color: colours.accent };
                });
                dispatch(
                    sortNumbersInsertionAction(unsortedArray, graphNumber)
                );
                return;
            }
            newArray[j + 1] = newArray[j];
            // Create a new sorted array with modified colors
            // eslint-disable-next-line no-loop-func
            const sortedArray = newArray.map((item, index) => {
                if (index === j || index === j + 1) {
                    if (item.color === '#f45050') {
                        return { ...item, color: colours.accent };
                    } else {
                        return { ...item, color: colours.error };
                    }
                }
                return item;
            });
            dispatch(sortNumbersInsertionAction(sortedArray, graphNumber));
            dispatch(iterationsCompletedAction(false, 1));
            await timer(len);
            j--;
        }

        newArray[j + 1] = current;

        // Create a new sorted array with green color for the current element
        const sortedArray = newArray.map((item, index) => {
            if (index === j + 1) {
                return { ...item, color: colours.error };
            }
            return item;
        });

        dispatch(sortNumbersInsertionAction(sortedArray, graphNumber));
    }

    // Set the color of all elements to green to indicate the sorting is complete
    const sortedArray = newArray.map((item) => {
        return { ...item, color: colours.success };
    });

    dispatch(sortNumbersInsertionAction(sortedArray, graphNumber));
    dispatch(sortInProgressAction(false));
    dispatch(sortedAction(true));
};

// delay timer function
async function timer(ms: number) {
    if (ms < 20)
        return new Promise((resolve) => setTimeout(resolve, 1000 / ms));
    return new Promise((resolve) =>
        setTimeout(resolve, 1000 / Math.pow(ms + 1, 1.5))
    );
}
