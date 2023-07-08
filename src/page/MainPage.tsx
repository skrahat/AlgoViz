import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    Slider,
    Paper,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../component/Button';
import {
    generateNumbersAction,
    sortInProgressAction,
    iterationsCompletedAction,
    sortedAction
} from '../redux/reducers/actions';
import { BubbleSort, InsertionSort } from '../component/Algorithms';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from '../component/Footer';
import BarGraph from '../component/BarGraph';
import Switch from '@mui/material/Switch';
import { colours } from '../styling/colours';
import { fetchData } from '../api/factApi';

// Define the MUI theme
const theme = createTheme({
    palette: {
        primary: {
            main: colours.primary
        },
        secondary: {
            main: colours.secondary
        },
        text: {
            primary: colours.accent,
            secondary: colours.primary
        }
    }
});

// Define the fact data structure
interface Fact {
    fact: string;
}

export default function Dashboard(): JSX.Element {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { result, sorted } = useSelector((state: any) => state);
    const [running, setRunning] = useState(false);
    const [languageValue, setLanguageValue] = useState(true);
    const [factData, setFactData] = useState<Fact[]>([]);
    const [arraySize, setArraySize] = useState<number>(10);
    const sortingInProgressState = useSelector(
        (state: any) => state.sortInProgess
    );
    const iterationsCompletedState = useSelector(
        (state: any) => state.iterationsCompleted
    );
    const stopControllerRef = useRef<AbortController | null>(null);

    // Generate the data array for the BarGraph component
    const GenerateDataGraph = (
        arrayX: { color: string; value: number }[],
        arrayY: number
    ): { x: number; y: number }[] => {
        return arrayX.map((item, index) => ({ x: index, y: item.value }));
    };

    // Clear the numbers and reset the sorting state
    const RemoveNumberFunction = () => {
        dispatch(sortedAction(false));
        dispatch(iterationsCompletedAction(true));
        dispatch(generateNumbersAction(arraySize));
    };

    // Perform bubble sort
    const bubbleSort = async () => {
        setRunning(true);
        stopControllerRef.current = new AbortController();

        callFacts();
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        await BubbleSort(result, stopControllerRef.current.signal, dispatch);
    };

    // Perform insertion sort
    const insertionSort = async () => {
        stopControllerRef.current = new AbortController();
        callFacts();

        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        InsertionSort(result, stopControllerRef.current.signal, dispatch);
    };

    // Handle the array size slider change
    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setArraySize(value);
            dispatch(generateNumbersAction(value)); // Update the array size in the Redux state
        }
        dispatch(sortedAction(false));
    };

    // Stop the sorting process
    const stopSortingHandler = () => {
        if (running) {
            stopControllerRef.current?.abort();
            setRunning(false);
        }
        dispatch(sortInProgressAction());
    };

    // Change the app language
    const changeLanguageHandler = () => {
        const newLanguage = languageValue ? 'fr' : 'en';
        i18n.changeLanguage(newLanguage).then(() => {
            setLanguageValue(!languageValue);
        });
    };

    // Fetch facts data
    const limit = 3;
    const callFacts = async () => {
        const data = await fetchData(limit);
        console.log('Fetched fact data:', data);
        setFactData(data);
    };

    useEffect(() => {
        dispatch(generateNumbersAction(arraySize));
        // Generate the initial data array for the BarGraph component
        GenerateDataGraph(result, result.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // Update the data array for the BarGraph component when result, arraySize, sortingInProgressState, or factData change
        GenerateDataGraph(result, result.length);
    }, [result, arraySize, sortingInProgressState, factData]);

    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: colours.background
            }}
        >
            <Container>
                {/* App Bar */}
                <ThemeProvider theme={theme}>
                    <AppBar
                        position="static"
                        sx={{
                            minHeight: '4rem',
                            maxHeight: '6rem',
                            backgroundColor: theme.palette.text.secondary
                        }}
                    >
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>
                                {/* App Title */}
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

                                {/* Array Size Slider */}
                                <Box sx={{ width: 100, padding: '0.4rem' }}>
                                    <Slider
                                        id="array-size-slider"
                                        value={arraySize}
                                        min={10}
                                        step={1}
                                        max={100}
                                        color="secondary"
                                        onChange={handleChange}
                                        disabled={sortingInProgressState}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="array-size-slider"
                                    />
                                </Box>

                                {/* Action Buttons */}
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: 'flex', md: 'flex' }
                                    }}
                                >
                                    <CustomButton
                                        id="stop-sorting-button"
                                        disabled={!sortingInProgressState}
                                        onClick={stopSortingHandler}
                                    >
                                        {t('Stop Sorting')}
                                    </CustomButton>
                                    <CustomButton
                                        id="clear-numbers-button"
                                        disabled={sortingInProgressState}
                                        onClick={RemoveNumberFunction}
                                    >
                                        {t('Update Numbers')}
                                    </CustomButton>
                                    <CustomButton
                                        id="bubble-sort-button"
                                        disabled={sortingInProgressState}
                                        onClick={bubbleSort}
                                    >
                                        {t('Bubble Sort')}
                                    </CustomButton>
                                    <CustomButton
                                        id="insertion-sort-button"
                                        disabled={sortingInProgressState}
                                        onClick={insertionSort}
                                    >
                                        {t('Insertion Sort')}
                                    </CustomButton>

                                    {/* Iterations Counter */}
                                    <div
                                        style={{
                                            marginRight: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0.5rem',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        {t(`Iterations`)}:
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                marginLeft: '0.5rem',
                                                color: colours.primary
                                            }}
                                        >
                                            {iterationsCompletedState}
                                        </Paper>
                                    </div>

                                    {/* Language Switch */}
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                id="language-switch"
                                                disabled={false}
                                                checked={!languageValue}
                                                onChange={changeLanguageHandler}
                                                color="secondary"
                                            />
                                        }
                                        label={
                                            languageValue
                                                ? 'English'
                                                : 'Français'
                                        }
                                        labelPlacement="start"
                                    />

                                    {/* Toast Container */}
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

                {/* Linear Progress */}
                {sortingInProgressState && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress color="secondary" />
                    </Box>
                )}

                {/* Bar Graph */}
                <Container
                    maxWidth="xl"
                    style={{ marginTop: '2rem', flex: '1' }}
                >
                    <BarGraph
                        result={result}
                        sortingInProgressState={sortingInProgressState}
                        sorted={sorted}
                    />
                </Container>

                {/* Facts */}
                {sortingInProgressState && (
                    <Container maxWidth="xl" style={{ marginBottom: '2rem' }}>
                        <Typography>{t('Random Facts')}:</Typography>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    {factData.map((fact, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{fact.fact}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                )}
            </Container>
            {/* Footer */}
            <Container style={{ marginTop: 'auto', width: '100%' }}>
                <Footer />
            </Container>
        </Container>
    );
}
