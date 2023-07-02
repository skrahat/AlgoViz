// BubbleSort.tsx

import React from 'react';

interface BubbleSortProps {
    array: number[];
    setArray: React.Dispatch<React.SetStateAction<number[]>>;
    setDisplayComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const BubbleSort: React.FC<BubbleSortProps> = ({
    array,
    setArray,
    setDisplayComplete
}) => {
    const bubbleSort = async () => {
        const sortedArray = [...array];
        const n = sortedArray.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (sortedArray[j] > sortedArray[j + 1]) {
                    // Swap elements
                    const temp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = temp;
                }
            }
            // Delay the loop to visualize the sorting process
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setArray(sortedArray);
        }

        setDisplayComplete(true);
    };

    return (
        <div>
            <button onClick={bubbleSort}>Sort</button>
        </div>
    );
};

export default BubbleSort;
