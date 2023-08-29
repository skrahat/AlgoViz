import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Container, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material/styles';
import {
    generateNumbersAction,
    sortInProgressAction,
    sortedAction
} from '../redux/reducers/actions';
import {
    BubbleSort,
    InsertionSort,
    MergeSort
} from '../component/algorithms/Algorithms';
import Footer from '../component/UIComponents/Footer';
import BarGraph from '../component/graphComponent/BarGraph';
import FactCard from '../component/UIComponents/FactCard';
import { theme } from '../component/constants';
import { SortingFunctions } from './Dashboard.type';
import AppBarSection from '../component/appBar/AppBarSection';

export const Dashboard = (): React.ReactElement => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { results, sorted } = useSelector((state: any) => state);
    const [running, setRunning] = useState(false);
    const [languageValue, setLanguageValue] = useState(true);
    const [arraySize, setArraySize] = useState<number>(10);

    const sortInProgressArrayState = useSelector(
        (state: any) => state.sortInProgressArray
    );
    const stopControllerRef = useRef<AbortController | null>(null);
    const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<string[]>(
        []
    );
    const [showAlert, setShowAlert] = useState(false);
    const MemoizedFactCard = React.memo(FactCard);

    const algorithmHandleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value }
        } = event;

        const selectedValues =
            typeof value === 'string' ? value.split(',') : value;

        if (selectedValues.length <= 2) {
            setSelectedAlgorithm(selectedValues);
        } else {
            setShowAlert(true);
        }
    };

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
        dispatch(generateNumbersAction(arraySize));
    };

    // Perform bubble sort
    const bubbleSort = useCallback(
        async (stopControllerRef: any, graphNumber: number) => {
            setRunning(true);
            dispatch(sortInProgressAction(true, graphNumber));

            await BubbleSort(
                results[graphNumber],
                stopControllerRef.signal,
                dispatch,
                graphNumber
            );
        },
        [dispatch, results]
    );

    // Perform insertion sort
    const insertionSort = useCallback(
        async (stopControllerRef: any, graphNumber: number) => {
            setRunning(true);
            dispatch(sortInProgressAction(true, graphNumber));
            await InsertionSort(
                results[graphNumber],
                stopControllerRef.signal,
                dispatch,
                graphNumber
            );
        },
        [dispatch, results]
    );
    const mergeSort = useCallback(
        async (stopControllerRef: any, graphNumber: number) => {
            setRunning(true);
            dispatch(sortInProgressAction(true, graphNumber));

            await MergeSort(
                results[graphNumber],
                stopControllerRef.signal,
                dispatch,
                graphNumber
            );
        },
        [dispatch, results]
    );

    const startSorting = useCallback(async () => {
        stopControllerRef.current = new AbortController();
        const sortingFunctions: SortingFunctions = {
            bubble: bubbleSort,
            insertion: insertionSort,
            merge: mergeSort
        };
        try {
            // Get all the selected algorithms
            const selectedAlgorithms = selectedAlgorithm.filter(
                (algorithm) => sortingFunctions[algorithm]
            );

            // If there's no selected algorithm, do nothing
            if (!selectedAlgorithms.length) {
                return;
            }
            // Map through the selected algorithms and start them
            const promises = selectedAlgorithms.map((algorithm, index) => {
                const sortingFunction = sortingFunctions[algorithm];
                return sortingFunction(
                    stopControllerRef.current as AbortController,
                    index
                );
            });

            // Wait for all the sorting algorithms to finish
            try {
                await Promise.all(promises);
            } catch (err) {
                console.error(
                    'One of the sorting algorithms encountered an error:',
                    err
                );
            }
        } catch (err) {
            console.error(`error caught while calling sorting algo: ${err}`);
        }
    }, [bubbleSort, insertionSort, mergeSort, selectedAlgorithm]);

    // Handle the array size slider change
    const handleChange = useCallback(
        (event: Event, value: number | number[]) => {
            if (typeof value === 'number') {
                setArraySize(value);
                dispatch(generateNumbersAction(value)); // Update the array size in the Redux state
            }
            dispatch(sortedAction(false));
        },
        [dispatch]
    );

    // Stop the sorting process
    const stopSortingHandler = useCallback(() => {
        if (running) {
            stopControllerRef.current?.abort();
            setRunning(false);
        }
        dispatch(sortInProgressAction(false, 2));
    }, [dispatch, running]);

    // Change the app language
    const changeLanguageHandler = useCallback(() => {
        const newLanguage = languageValue ? 'fr' : 'en';
        i18n.changeLanguage(newLanguage).then(() => {
            setLanguageValue(!languageValue);
        });
    }, [i18n, languageValue]);
    const showAlertHandler = () => {
        setShowAlert(false);
    };
    useEffect(() => {
        dispatch(generateNumbersAction(arraySize));
    }, [arraySize, dispatch]);

    useEffect(() => {
        GenerateDataGraph(results, results[0].length);
    }, [results, arraySize, sortInProgressArrayState]);

    return (
        <div className="background">
            <Container className="container" disableGutters>
                {/* App Bar */}
                <ThemeProvider theme={theme}>
                    <AppBarSection
                        arraySize={arraySize}
                        sortInProgressArrayState={sortInProgressArrayState}
                        selectedAlgorithm={selectedAlgorithm}
                        handleChange={handleChange}
                        showAlert={showAlert}
                        showAlertHandler={showAlertHandler}
                        stopSortingHandler={stopSortingHandler}
                        RemoveNumberFunction={RemoveNumberFunction}
                        algorithmHandleChange={algorithmHandleChange}
                        startSorting={startSorting}
                        languageValue={languageValue}
                        changeLanguageHandler={changeLanguageHandler}
                        t={t}
                    />
                </ThemeProvider>
                {/* Bar components start here */}
                <Container
                    maxWidth="xl"
                    className={
                        selectedAlgorithm.length === 0 ? 'row' : 'row-two'
                    }
                >
                    {/* Bar Graph */}
                    {selectedAlgorithm.length === 0 ? (
                        <MemoizedFactCard
                            title={{
                                text: t(`instructions.title`),
                                animation: false
                            }}
                            description1={{
                                text: t(`instructions.description1`),
                                animation: true
                            }}
                            description2={{
                                text: t(`instructions.description2`),
                                animation: true
                            }}
                        />
                    ) : (
                        <Box>
                            <Typography variant="h6">
                                {t(`cards.${selectedAlgorithm[0]}.title`)}
                            </Typography>

                            <div className="col">
                                <BarGraph
                                    result={results[0]}
                                    sortingInProgressState={
                                        sortInProgressArrayState[0]
                                    }
                                    sorted={sorted}
                                />
                                <MemoizedFactCard
                                    title={{
                                        text: t(
                                            `cards.${selectedAlgorithm[0]}.title`
                                        ),
                                        animation: false
                                    }}
                                    description1={{
                                        text: t(
                                            `cards.${selectedAlgorithm[0]}.description1`
                                        ),
                                        animation: false
                                    }}
                                    description2={{
                                        text: t(
                                            `cards.${selectedAlgorithm[0]}.description2`
                                        ),
                                        animation: false
                                    }}
                                />
                            </div>
                        </Box>
                    )}
                    {selectedAlgorithm.length === 2 ? (
                        <Box>
                            <Typography variant="h6">
                                {t(`cards.${selectedAlgorithm[1]}.title`)}
                            </Typography>

                            <div className="col">
                                <BarGraph
                                    result={results[1]}
                                    sortingInProgressState={
                                        sortInProgressArrayState[1]
                                    }
                                    sorted={sorted}
                                />

                                <MemoizedFactCard
                                    title={{
                                        text: t(
                                            `cards.${selectedAlgorithm[1]}.title`
                                        ),
                                        animation: false
                                    }}
                                    description1={{
                                        text: t(
                                            `cards.${selectedAlgorithm[1]}.description1`
                                        ),
                                        animation: false
                                    }}
                                    description2={{
                                        text: t(
                                            `cards.${selectedAlgorithm[1]}.description2`
                                        ),
                                        animation: false
                                    }}
                                />
                            </div>
                        </Box>
                    ) : (
                        ''
                    )}
                </Container>

                {/* Footer */}
                <Container className="footer-container" disableGutters>
                    <Footer />
                </Container>
            </Container>
        </div>
    );
};
