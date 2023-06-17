import {
    iterationsCompletedAction,
    sortInProgressAction,
    sortNumbersBubbleAction,
    sortNumbersInsertionAction,
    sortedAction
} from '../redux/reducers/actions';

export const BubbleSort = async (result: any[], dispatch: any) => {
    console.log('started bubble sort');
    const newArray = [...result];
    const len = newArray.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            await timer(5000 / len);
            if (newArray[j].value > newArray[j + 1].value) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;

                // Create a new sorted array with modified colors
                const sortedArray = newArray.map((item, index) => {
                    if (index === j || index === j + 1) {
                        if (item.color === 'red') {
                            return { ...item, color: 'blue' };
                        } else {
                            return { ...item, color: 'red' };
                        }
                    }
                    return item;
                });

                dispatch(sortNumbersBubbleAction(sortedArray));
                dispatch(iterationsCompletedAction(false));
            }
        }
    }
    // Set the color of all elements to green to indicate the sorting is complete
    const sortedArray = newArray.map((item) => {
        return { ...item, color: 'green' };
    });
    dispatch(sortNumbersBubbleAction(sortedArray));

    dispatch(sortInProgressAction());
    dispatch(sortedAction());
    console.log('ended bubble sort');
};

export const InsertionSort = async (array: any[], dispatch: any) => {
    const newArray = [...array];
    const len = newArray.length;

    for (let i = 1; i < len; i++) {
        let current = newArray[i];
        let j = i - 1;

        while (j >= 0 && newArray[j].value > current.value) {
            newArray[j + 1] = newArray[j];
            const sortedArray = [...newArray]; // Create a copy of newArray
            dispatch(sortNumbersInsertionAction(sortedArray));
            dispatch(iterationsCompletedAction(false));
            await timer(5000 / len);
            j--;
        }

        newArray[j + 1] = current;

        // Create a new sorted array with green color for the current element
        const sortedArray = newArray.map((item, index) => {
            if (index === j + 1) {
                return { ...item, color: 'red' };
            }
            return item;
        });

        dispatch(sortNumbersInsertionAction(sortedArray));
        dispatch(iterationsCompletedAction(false));
        await timer(100);
    }

    // Set the color of all elements to green to indicate the sorting is complete
    const sortedArray = newArray.map((item) => {
        return { ...item, color: 'green' };
    });

    dispatch(sortNumbersInsertionAction(sortedArray));
    dispatch(sortInProgressAction());
    dispatch(sortedAction());
    console.log('ended insertion sort');
};

// delay timer function
async function timer(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
