import React, { useEffect, useState } from 'react';

//delay timer function async
function timer(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//bubble sort function
async function bubbleSort(array: Number[]) {
    array = array.slice(); // creates a copy of the array

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            //setTimeout(function () {
            await timer(100);
            if (array[j] > array[j + 1]) {
                let swap = array[j];
                array[j] = array[j + 1];
                array[j + 1] = swap;
            }
        }
    }
}

//mergesort function below//////////////////
function swap(items: Number[], leftIndex: number, rightIndex: number) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items: Number[], left: number, right: number) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items: Number[], left: number, right: number) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}
