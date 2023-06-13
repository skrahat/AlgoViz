import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Slider } from '@mui/material';
//import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import Algorithm from '../component/Algorithms';
import CustomButton from '../component/Button';
const theme = createTheme({
    palette: {
        primary: {
            main: '#42a5f5'
        },
        secondary: {
            main: '#bbdefb'
        },
        text: {
            primary: '#e3f2fd',
            secondary: '#0d47a1'
        }
    }
});

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
export default function Dashboard() {
    const { t, i18n } = useTranslation();
    const [result, setResult] = React.useState<Array<number>>([]);
    const [displayComplete, setDisplayComplete] = React.useState<Boolean>(true);
    const [sortingInProgress, setSortingInProgress] = useState(false);
    //const [loading, setLoading] = React.useState(Boolean);
    //const [displayNewNumber, setDisplayNewNumber] = React.useState(Boolean);
    //const errorMessage = Snackbar('error');
    const [arraySize, setArraySize] = React.useState(20);

    const RandomNumberGeneratorFunction = () => {
        setResult([]);
        setDisplayComplete(true);
        for (let counter = 0; counter < arraySize; counter++) {
            const randomNumber = parseFloat((Math.random() * 100).toFixed(0));
            setResult((prevState) => [...prevState, randomNumber]);
        }
        return result;
    };

    const GenerateDataGraph = (arrayX: number[], arrayY: number) => {
        var result: any = [];
        for (var i = 0; i < arrayY; i++) {
            result.push({ x: arrayX[i], y: i });
        }

        return result;
    };
    //data for graph
    const data = {
        datasets: [
            {
                label: 'Numbers',
                data: GenerateDataGraph(result, arraySize),
                backgroundColor: 'rgba(55, 99, 132, 1)'
            }
        ]
    };

    //clear generated numbers
    const RemoveNumberFunction = () => {
        setResult(() => []);
    };
    //check if array is already sorted
    async function CheckArraySorted(array: number[]) {
        const checker = array.reduce((memo, item) =>
            memo > item ? 101 : item
        );
        console.log(`checking array ${checker}`);
        return checker < 101 ? true : false;
    }

    //delay timer function async
    function timer(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    //bubble sort function
    async function bubbleSort(array: number[]) {
        if (!sortingInProgress) {
            setSortingInProgress(true);
            if (array === undefined || array.length === 0) {
                return toast('Please generate Numbers first');
            }
            console.log(`started`);
            const checker = await CheckArraySorted(array);
            console.log(`check array completed ${checker}`);
            if (!checker) {
                setDisplayComplete(false);
                console.log(`loopstart ${displayComplete}`);
                array = array.slice(); // creates a copy of the array

                for (let i = 0; i < array.length; i++) {
                    for (let j = 0; j < array.length - 1; j++) {
                        //setTimeout(function () {
                        await timer(10);
                        if (array[j] > array[j + 1]) {
                            let swap = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = swap;
                            setResult([...array]);
                        }
                    }
                }
                setDisplayComplete(true);
                toast('Sorting completed!');
                // setLoading(true);
                console.log(`loopend ${displayComplete}`);
            } else {
                toast('Already sorted! Please Generate new array :)');
            }
            setSortingInProgress(false);
        }
    }
    //calling merge sort funnction////
    function mergeSortCall(array: number[]) {
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

    function quickSort(items: number[], left: number, right: number) {
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

    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') setArraySize(value);
    };

    // change language handler
    const changeLanguageHandler = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    /** 
     use effect to update dynamic values
     includes display for result and graph
     */
    useEffect(() => {
        setResult(result);

        GenerateDataGraph(result, arraySize);
    }, [result, displayComplete, arraySize]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                sx={{
                                    mr: 3,
                                    display: { xs: 'none', md: 'flex' },
                                    color: theme.palette.text.primary,
                                    fontSize: '1.5rem'
                                }}
                            >
                                {t(`learnolej`)}
                            </Typography>
                            <Box sx={{ width: 100, padding: '0.4rem' }}>
                                <Slider
                                    value={arraySize}
                                    min={20}
                                    step={1}
                                    max={100}
                                    color="secondary"
                                    onChange={handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' }
                                }}
                            >
                                <CustomButton
                                    id="generateNumberID"
                                    disabled={!displayComplete}
                                    onClick={() =>
                                        RandomNumberGeneratorFunction()
                                    }
                                >
                                    {t('Generate Numbers')}
                                </CustomButton>

                                <CustomButton
                                    id="clearNumberID"
                                    disabled={!displayComplete}
                                    onClick={() => RemoveNumberFunction()}
                                >
                                    {t('Remove Numbers')}
                                </CustomButton>

                                <CustomButton
                                    id="bubble-sort-button"
                                    onClick={() => bubbleSort(result)}
                                >
                                    {t('Bubble sort')}
                                </CustomButton>

                                <CustomButton
                                    id="merge-sort-button"
                                    disabled={true}
                                    onClick={() => mergeSortCall(result)}
                                >
                                    {t('Merge sort')}
                                </CustomButton>

                                <CustomButton
                                    id="FR-language-button"
                                    onClick={() => changeLanguageHandler('fr')}
                                >
                                    Fr
                                </CustomButton>

                                <CustomButton
                                    id="EN-language-button"
                                    onClick={() => changeLanguageHandler('en')}
                                >
                                    En
                                </CustomButton>

                                <ToastContainer
                                    position="top-center"
                                    autoClose={2000}
                                    hideProgressBar
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>

            <Scatter options={options} data={data} />
            <h1>
                {displayComplete
                    ? ''
                    : 'Calculating, (press sorting twice if issue with visualization)'}
            </h1>
        </div>
    );
}
