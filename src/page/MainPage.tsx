import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Slider,
    Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../component/Button';
import {
    stopBubbleSortAction,
    generateNumbersAction,
    sortInProgressAction,
    iterationsCompletedAction,
    sortedAction
} from '../redux/reducers/actions';
import { BubbleSort, InsertionSort } from '../component/Algorithms';
import LinearProgress from '@mui/material/LinearProgress';

import Footer from '../component/Footer';
import BarGraph from '../component/BarGraph';
//import { algoStopAction } from '../redux/reducers/actions';

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

export default function Dashboard(): JSX.Element {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { result, sorted, algoStop } = useSelector((state: any) => state);
    const [running, setRunning] = useState(false);

    const [arraySize, setArraySize] = React.useState<number>(10);
    const sortingInProgressState = useSelector(
        (state: any) => state.sortInProgess
    );
    const iterationsCompletedState = useSelector(
        (state: any) => state.iterationsCompleted
    );
    const stopControllerRef = useRef<AbortController | null>(null);
    const GenerateDataGraph = (
        arrayX: { color: string; value: number }[],
        arrayY: number
    ): { x: number; y: number }[] => {
        var result: { x: number; y: number }[] = [];
        for (var i = 0; i < arrayY; i++) {
            result.push({ x: i, y: arrayX[i].value });
        }
        return result;
    };

    const RemoveNumberFunction = () => {
        dispatch(sortedAction(false));
        dispatch(iterationsCompletedAction(true));
        dispatch(generateNumbersAction(0));
    };

    const bubbleSort = async () => {
        setRunning(true);
        stopControllerRef.current = new AbortController();

        console.log('started bubble sort');
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        await BubbleSort(result, stopControllerRef.current.signal, dispatch);
    };

    const insertionSort = async () => {
        console.log('started Insertion sort');
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        InsertionSort(result, dispatch);
    };

    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') setArraySize(value);
        dispatch(sortedAction(false));
        dispatch(generateNumbersAction(arraySize));
    };

    const stopSortingHandler = () => {
        if (running) {
            stopControllerRef.current?.abort();
            setRunning(false);
        }
        dispatch(sortInProgressAction());
    };

    const changeLanguageHandler = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    useEffect(() => {
        dispatch(generateNumbersAction(arraySize));
        GenerateDataGraph(result, result.length);
    }, []);
    useEffect(() => {
        GenerateDataGraph(result, result.length);
    }, [result, arraySize, sortingInProgressState]);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar
                    position="static"
                    sx={{
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: theme.zIndex.drawer + 1,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        backgroundColor: theme.palette.text.secondary
                    }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                sx={{
                                    mr: 3,
                                    display: { xs: 'flex', md: 'flex' },
                                    color: theme.palette.text.primary,
                                    fontSize: '1.5rem'
                                }}
                            >
                                {t(`AlgoViz`)}
                            </Typography>

                            <Box sx={{ width: 100, padding: '0.4rem' }}>
                                <Slider
                                    value={arraySize}
                                    min={10}
                                    step={1}
                                    max={100}
                                    color="secondary"
                                    onChange={handleChange}
                                    disabled={sortingInProgressState}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                />
                            </Box>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'flex', md: 'flex' }
                                }}
                            >
                                <CustomButton
                                    id="algoStopID"
                                    disabled={!sortingInProgressState}
                                    onClick={stopSortingHandler}
                                >
                                    {t('Stop Sorting')}
                                </CustomButton>
                                <CustomButton
                                    id="clearNumberID"
                                    disabled={sortingInProgressState}
                                    onClick={RemoveNumberFunction}
                                >
                                    {t('Remove Numbers')}
                                </CustomButton>
                                <CustomButton
                                    id="bubble-sort-button"
                                    disabled={sortingInProgressState}
                                    onClick={bubbleSort}
                                >
                                    {t('Bubble sort')}
                                </CustomButton>
                                <CustomButton
                                    id="Insertion-sort-button"
                                    disabled={sortingInProgressState}
                                    onClick={insertionSort}
                                >
                                    {t('Insertion sort')}
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
                                <div
                                    style={{
                                        marginRight: 3,
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '0.5rem',
                                        borderRadius: '4px',
                                        color: theme.palette.text.primary
                                    }}
                                >
                                    {t(`Iterations`)}:
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: '0.5rem',
                                            borderRadius: '4px',
                                            marginLeft: '0.5rem',
                                            color: theme.palette.text.secondary
                                        }}
                                    >
                                        {iterationsCompletedState}
                                    </Paper>
                                </div>

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
            <div>
                {sortingInProgressState && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress color="secondary" />
                    </Box>
                )}
            </div>
            <BarGraph
                result={result}
                sortingInProgressState={sortingInProgressState}
                sorted={sorted}
            />
            <div>
                <Footer />
            </div>
        </div>
    );
}
