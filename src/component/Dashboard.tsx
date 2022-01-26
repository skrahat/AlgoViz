import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Snackbar, SnackbarContent, Theme, withStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';

const pages = ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        position: 'static'
    },
    container: { maxWidth: 'xl' },
    buttonBoxContainer: {
        sx: {
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' }
        }
    },
    dashBoardText: {
        variant: 'h6',
        noWrap: true,
        component: 'div',
        sx: { mr: 2, display: { xs: 'none', md: 'flex' } }
    },
    sortButton: {
        sx: { my: 2, color: 'white', display: 'block' }
    }
}));

export default function Header() {
    const classes = useStyles();
    const [result, setResult] = React.useState<Array<Number>>([]);
    const [displayComplete, setDisplayComplete] = React.useState<Boolean>(true);
    const [loading, setLoading] = React.useState(Boolean);
    //const [displayNewNumber, setDisplayNewNumber] = React.useState(Boolean);
    //const errorMessage = Snackbar('error');

    const RandomNumberGeneratorFunction = () => {
        setResult([]);
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
        setLoading(true);
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
        setLoading(false);
        console.log(`loopend ${displayComplete}`);
    }
    function mergeSortCall(array: Number[]) {
        const sortedArray = quickSort(array, 0, array.length - 1);
        setResult(sortedArray);
        console.log(result);
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
    const temp = (array: Number[]) => {
        mergeSortCall(array);
        setResult(result);
    };

    useEffect(() => {
        setResult(result);
        console.log(result);
        //setDisplayComplete(false);
    }, [result, displayComplete]);

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Snackbar
                            open={false}
                            message="Sorting completed"
                            autoHideDuration={6000}
                        />
                        <Typography
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
