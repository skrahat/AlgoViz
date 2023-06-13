export const bubbleSort = (array: number[]) => {
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i++) {
        for (let j = 0; j < newArray.length - 1; j++) {
            if (newArray[j] > newArray[j + 1]) {
                let swap = newArray[j];
                newArray[j] = newArray[j + 1];
                newArray[j + 1] = swap;
            }
        }
    }
    return newArray;
};
