import {
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortNumbersMergeAction,
    sortedAction
} from '../../redux/reducers/actions';
import { colours } from '../../styling/colours';
import { timer } from './Timer';

export const BubbleSort = async (
    result: any[],
    signal: AbortSignal,
    dispatch: any,
    graphNumber: number
) => {
    const newArray = [...result];
    const len = newArray.length;

    for (let i = 0; i < len; i++) {
        let swapped = false; // To keep track if any swapping happened in the inner loop

        for (let j = 0; j < len - 1 - i; j++) {
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
                swapped = true;

                // Create a new sorted array with modified colors
                const sortedArray = newArray.map((item, index) => {
                    if (index === j || index === j + 1) {
                        if (item.color !== colours.success) {
                            // Ensure we don't change color of sorted items
                            if (item.color === '#f45050') {
                                return { ...item, color: colours.accent };
                            } else {
                                return { ...item, color: colours.error };
                            }
                        }
                    }
                    return item;
                });

                dispatch(sortNumbersBubbleAction(sortedArray, graphNumber));
                await timer(len);
            }
        }

        // If no two elements were swapped by the inner loop, then the array is sorted
        if (!swapped) break;

        // After the inner loop is done, the element at (len - 1 - i) is in its correct position
        newArray[len - 1 - i] = {
            ...newArray[len - 1 - i],
            color: colours.success
        };
        dispatch(sortNumbersBubbleAction([...newArray], graphNumber));
    }

    dispatch(sortInProgressAction(false, graphNumber));
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
    dispatch(sortInProgressAction(false, graphNumber));
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

    const checkAbortSignal = () => {
        if (signal.aborted) {
            throw new Error('Aborted');
        }
    };
    // Helper function to reset colors
    const resetColors = (arr: any[]) => {
        return arr.map((item) => {
            if (item.color === colours.error) {
                return { ...item, color: colours.accent };
            }
            return item;
        });
    };
    const merge = async (left: any[], right: any[], start: number) => {
        let resultArray = [],
            leftIndex = 0,
            rightIndex = 0;

        const updateAndDispatch = async (mergedIndex: number) => {
            checkAbortSignal();
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
            await timer(len);
        };

        while (leftIndex < left.length && rightIndex < right.length) {
            checkAbortSignal();

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
            checkAbortSignal();

            resultArray.push(left[leftIndex]);
            newArray[start + leftIndex + rightIndex] = left[leftIndex];
            await updateAndDispatch(leftIndex + rightIndex);
            leftIndex++;
        }

        while (rightIndex < right.length) {
            checkAbortSignal();

            resultArray.push(right[rightIndex]);
            newArray[start + leftIndex + rightIndex] = right[rightIndex];
            await updateAndDispatch(leftIndex + rightIndex);
            rightIndex++;
        }

        return resultArray;
    };

    const sort = async (array: any[], start = 0): Promise<any[]> => {
        checkAbortSignal();

        if (array.length === 1) {
            return array;
        }

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        const sortedLeft = await sort(left, start);
        const sortedRight = await sort(right, start + middle);
        return merge(sortedLeft, sortedRight, start);
    };

    try {
        const sortedArray = await sort(newArray);

        // Set the color of all elements to green to indicate the sorting is complete
        const finalSortedArray = sortedArray.map((item) => {
            return { ...item, color: colours.success };
        });

        dispatch(sortNumbersMergeAction(finalSortedArray, graphNumber));
        dispatch(sortInProgressAction(false, graphNumber));
        dispatch(sortedAction(true));
    } catch (e) {
        if ((e as Error).message === 'Aborted') {
            const resetArray = resetColors(newArray);
            dispatch(sortNumbersMergeAction(resetArray, graphNumber));
        } else {
            console.error(e);
            throw e; // rethrow the error if it's not an abort
        }
    }
};
