import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Snackbar, SnackbarContent } from '@mui/material';

const pages = ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
    const [result, setResult] = React.useState<Array<Number>>([]);
    const [displayComplete, setDisplayComplete] = React.useState<Boolean>(true);
    //const [displayNewNumber, setDisplayNewNumber] = React.useState(Boolean);
    //const errorMessage = Snackbar('error');

    const RandomNumberGeneratorFunction = () => {
        setResult((prevState) => []);
        setDisplayComplete(true);
        for (let counter = 0; counter < 20; counter++) {
            const randomNumber = parseFloat((Math.random() * 100).toFixed(0));
            setResult((prevState) => [...prevState, randomNumber]);
        }
        return result;
    };
    //clear generated numbers
    const RemoveNumberFunction = () => {
        setResult((prevState) => []);
    };

    //delay timer function async
    function timer(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    //bubble sort function
    async function bubbleSort(array: Number[]) {
        setDisplayComplete(false);
        console.log(`loopstart ${displayComplete}`);
        array = array.slice(); // creates a copy of the array

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                //setTimeout(function () {
                await timer(100);
                if (array[j] > array[j + 1]) {
                    let swap = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = swap;
                    setResult(array);
                }
            }
        }
        setDisplayComplete(true);
        console.log(`loopend ${displayComplete}`);
    }
    const mergeSortCall = (array: Number[]) => {
        quickSort(array, 0, array.length - 1)
            .then((numberArray) => {
                if (numberArray) {
                    setResult(numberArray);
                }
            })
            .catch((e) => console.log('Error: ', e));

        console.log(result);
    };
    //mergesort function below//////////////////
    async function swap(
        items: Number[],
        leftIndex: number,
        rightIndex: number
    ) {
        var temp = items[leftIndex];
        items[leftIndex] = items[rightIndex];
        items[rightIndex] = temp;
    }
    async function partition(items: Number[], left: number, right: number) {
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

    async function quickSort(items: Number[], left: number, right: number) {
        var index;
        if (items.length > 1) {
            index = partition(items, left, right); //index returned from partition
            if (left < (await index) - 1) {
                //more elements on the left side of the pivot
                quickSort(items, left, (await index) - 1);
            }
            if ((await index) < right) {
                //more elements on the right side of the pivot
                quickSort(items, await index, right);
            }
        }
        return items;
    }

    useEffect(() => {
        setResult(result);
        //setDisplayComplete(false);
    }, [result, displayComplete]);

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            DashBoard
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' }
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            ></IconButton>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' }
                            }}
                        >
                            <Button
                                id="generateNumberID"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => RandomNumberGeneratorFunction()}
                            >
                                Generate Numbers
                            </Button>
                            <Button
                                id="clearNumberID"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => RemoveNumberFunction()}
                            >
                                Remove Numbers
                            </Button>
                            <Button
                                id="bubble-sort-button"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => bubbleSort(result)}
                            >
                                Bubble sort
                            </Button>
                            <Button
                                id="merge-sort-button"
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => mergeSortCall(result)}
                            >
                                Merge sort
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <div text-align="center">
                {result.map((item, i) => (
                    <p id="generated-numbers" key={i}>
                        {item}
                    </p>
                ))}
            </div>
            <h1>{displayComplete ? '' : 'Working on it'}</h1>
        </div>
    );
}
