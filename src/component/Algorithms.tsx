import {
    iterationsCompletedAction,
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortNumbersMergeAction,
    sortedAction
} from '../redux/reducers/actions';
import { colours } from '../styling/colours';

export const BubbleSort = async (
    result: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    console.log('BubbleSort graphNumber', graphNumber);

    const newArray = [...result];
    const len = newArray.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            // Check if the abort signal is triggered
            if (signal.aborted) {
                const unsortedArray = newArray;

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
                dispatch(iterationsCompletedAction(false, graphNumber));
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
                const unsortedArray = newArray;
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
            dispatch(iterationsCompletedAction(false, graphNumber));
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
export const MergeSort = async (
    result: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    const newArray = [...result];
    const len = newArray.length;
    console.log('merge graphNumber', graphNumber);
    // Helper function to merge two arrays
    const merge = async (left: any[], right: any[], start: number) => {
        let resultArray = [],
            leftIndex = 0,
            rightIndex = 0;

        const updateAndDispatch = async (mergedIndex: number) => {
            const updatedArray = newArray.map((item, index) => {
                if (index === start + mergedIndex) {
                    if (item.color === '#f45050') {
                        return { ...item, color: colours.accent };
                    } else {
                        return { ...item, color: colours.error };
                    }
                }
                return item;
            });
            dispatch(sortNumbersMergeAction(updatedArray, graphNumber));
            await timer(len / 2);
        };

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].value < right[rightIndex].value) {
                resultArray.push(left[leftIndex]);
                newArray[start + leftIndex + rightIndex] = left[leftIndex];
                await updateAndDispatch(leftIndex + rightIndex);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                newArray[start + leftIndex + rightIndex] = right[rightIndex];
                await updateAndDispatch(leftIndex + rightIndex);
                rightIndex++;
            }
        }

        while (leftIndex < left.length) {
            resultArray.push(left[leftIndex]);
            newArray[start + leftIndex + rightIndex] = left[leftIndex];
            await updateAndDispatch(leftIndex + rightIndex);
            leftIndex++;
        }

        while (rightIndex < right.length) {
            resultArray.push(right[rightIndex]);
            newArray[start + leftIndex + rightIndex] = right[rightIndex];
            await updateAndDispatch(leftIndex + rightIndex);
            rightIndex++;
        }

        return resultArray;
    };

    // Recursive function to divide and sort the array
    const sort = async (array: any[], start = 0): Promise<any[]> => {
        if (array.length === 1) {
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        // Check if the abort signal is triggered
        if (signal.aborted) {
            dispatch(sortNumbersMergeAction(array, graphNumber));
            return array;
        }

        const sortedLeft = await sort(left, start);
        const sortedRight = await sort(right, start + middle);
        return merge(sortedLeft, sortedRight, start);
    };

    // Initiate the sorting
    const sortedArray = await sort(newArray);

    // Set the color of all elements to green to indicate the sorting is complete
    const finalSortedArray = sortedArray.map((item) => {
        return { ...item, color: colours.success };
    });

    dispatch(sortNumbersMergeAction(finalSortedArray, graphNumber));
    dispatch(sortInProgressAction(false));
    dispatch(sortedAction(true));
};

export const MergeSortx = async (
    result: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    const newArray = [...result];
    const len = newArray.length;
    // The helper function to merge two arrays
    const merge = async (left: any[], right: any[], start: number) => {
        let resultArray = [],
            leftIndex = 0,
            rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].value < right[rightIndex].value) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
            dispatch(iterationsCompletedAction(false, graphNumber));
            await timer(len * 10);
        }

        const merged = resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));

        // Update the newArray with the merged data
        for (let i = 0; i < merged.length; i++) {
            newArray[start + i] = merged[i];
        }
        return merged;
    };

    const sort = async (array: any[], start = 0): Promise<any[]> => {
        if (array.length === 1) {
            // return once we hit an array with a single item
            return array;
        }

        const middle = Math.floor(array.length / 2); // get the middle item of the array
        const left = array.slice(0, middle); // items on the left side
        const right = array.slice(middle); // items on the right side

        // Check if the abort signal is triggered
        if (signal.aborted) {
            dispatch(sortNumbersMergeAction(array, graphNumber));
            return array;
        }

        const sortedLeft = await sort(left, start);
        const sortedRight = await sort(right, start + middle);

        const mergedArray = await merge(sortedLeft, sortedRight, start);

        dispatch(sortNumbersMergeAction([...newArray], graphNumber)); // Dispatch the whole newArray for visualization
        await timer(len);

        return mergedArray;
    };
    const sortedArray = await sort(newArray);

    // Set the color of all elements to green to indicate the sorting is complete
    const finalSortedArray = sortedArray.map((item) => {
        return { ...item, color: colours.success };
    });

    dispatch(sortNumbersMergeAction(finalSortedArray, graphNumber));

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
