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
    TableHead,
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
import Switch, { SwitchProps } from '@mui/material/Switch';
import { colours } from '../styling/colours';
import { fetchData } from '../api/factApi';

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
        dispatch(generateNumbersAction(arraySize));
    };

    const bubbleSort = async () => {
        setRunning(true);
        stopControllerRef.current = new AbortController();

        callFacts();
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        await BubbleSort(result, stopControllerRef.current.signal, dispatch);
    };

    const insertionSort = async () => {
        stopControllerRef.current = new AbortController();
        callFacts();

        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        InsertionSort(result, stopControllerRef.current.signal, dispatch);
    };

    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') {
            setArraySize(value);
            dispatch(generateNumbersAction(value)); // Update the array size in the Redux state
        }
        dispatch(sortedAction(false));
    };

    const stopSortingHandler = () => {
        if (running) {
            stopControllerRef.current?.abort();
            setRunning(false);
        }
        dispatch(sortInProgressAction());
    };

    const changeLanguageHandler = () => {
        if (languageValue) {
            i18n.changeLanguage('fr');
        } else i18n.changeLanguage('en');
        setLanguageValue(!languageValue);
    };

    const limit = 3;
    const callFacts = async () => {
        const data = await fetchData(limit);
        console.log('fetched fact data: ' + data);
        setFactData(data);
    };

    useEffect(() => {
        dispatch(generateNumbersAction(arraySize));
        GenerateDataGraph(result, result.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        GenerateDataGraph(result, result.length);
    }, [result, arraySize, sortingInProgressState, factData]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            disabled={true}
                                            checked={!languageValue}
                                            onChange={changeLanguageHandler}
                                            color="secondary"
                                        />
                                    }
                                    label={
                                        languageValue ? 'English' : 'Français'
                                    }
                                    labelPlacement="start"
                                />
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
            <div
                style={{
                    marginTop: '2rem',
                    flex: '1' // Add this to make the content take the remaining space
                }}
            >
                <BarGraph
                    result={result}
                    sortingInProgressState={sortingInProgressState}
                    sorted={sorted}
                />
            </div>
            <div>
                {sortingInProgressState && (
                    <div>
                        <Typography>Random facts:</Typography>
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
                    </div>
                )}
            </div>
            <div style={{ marginTop: 'auto' }}>
                <Footer />
            </div>
        </div>
    );
}
