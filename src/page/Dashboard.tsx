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
    SelectChangeEvent,
    OutlinedInput,
    FormControl,
    Select,
    MenuItem,
    Checkbox
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../component/UIComponents/CustomButton';
import {
    generateNumbersAction,
    sortInProgressAction,
    iterationsCompletedAction,
    sortedAction
} from '../redux/reducers/actions';
import { BubbleSort, InsertionSort } from '../component/Algorithms';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from '../component/UIComponents/Footer';
import BarGraph from '../component/graphComponent/BarGraph';
import Switch from '@mui/material/Switch';
import { colours } from '../styling/colours';
import { fetchData } from '../api/factApi';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import FactCard from '../component/UIComponents/FactCard';
import GraphComponent from '../component/graphComponent';

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
    const { results, sorted } = useSelector((state: any) => state);
    const [running, setRunning] = useState(false);
    const [languageValue, setLanguageValue] = useState(true);
    const [displayFact, setDisplayFact] = useState(false);
    const [factData, setFactData] = useState<Fact[]>([]);
    const [arraySize, setArraySize] = useState<number>(10);
    const sortingInProgressState = useSelector(
        (state: any) => state.sortInProgress
    );
    const iterationsCompletedState = useSelector(
        (state: any) => state.iterationsCompleted
    );
    const stopControllerRef = useRef<AbortController | null>(null);
    const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<string[]>(
        []
    );

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: '4rem'
            }
        }
    };
    const algorithmList = ['bubble', 'insertion'];
    const algorithmHandleChange = (
        event: SelectChangeEvent<typeof selectedAlgorithm>
    ) => {
        const {
            target: { value }
        } = event;
        setSelectedAlgorithm(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
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
        dispatch(iterationsCompletedAction(true));
        dispatch(generateNumbersAction(arraySize));
    };

    // Perform bubble sort
    const bubbleSort = async (stopControllerRef: any, graphNumber: number) => {
        setRunning(true);
        dispatch(sortInProgressAction(true));
        console.log('resultOne start:', results[graphNumber]);
        await BubbleSort(
            results[graphNumber],
            stopControllerRef.signal,
            dispatch,
            graphNumber
        );
        console.log('resultOne start:', results[graphNumber]);
    };

    // Perform insertion sort
    const insertionSort = async (
        stopControllerRef: any,
        graphNumber: number
    ) => {
        setRunning(true);
        dispatch(sortInProgressAction(true));
        console.log('resultTwo start:', results[graphNumber]);
        await InsertionSort(
            results[graphNumber],
            stopControllerRef.signal,
            dispatch,
            graphNumber
        );
        console.log('resultTwo end:', results[graphNumber]);
    };

    const startSorting = () => {
        dispatch(iterationsCompletedAction(true));
        stopControllerRef.current = new AbortController();
        try {
            if (
                selectedAlgorithm.includes('bubble') &&
                selectedAlgorithm.includes('insertion')
            ) {
                Promise.all([
                    bubbleSort(stopControllerRef.current, 0),
                    insertionSort(stopControllerRef.current, 1)
                ]);
            } else if (selectedAlgorithm.includes('bubble')) {
                bubbleSort(stopControllerRef.current, 0);
            } else if (selectedAlgorithm.includes('insertion')) {
                insertionSort(stopControllerRef.current, 1);
            }
        } catch (err) {
            console.log(`error caught while calling sorting algo: ${err}`);
        }
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
        dispatch(sortInProgressAction(false));
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
        setFactData(data);
    };

    const handleCheckboxClick = () => {
        setDisplayFact((prevValue) => !prevValue);
        callFacts();
    };

    useEffect(() => {
        dispatch(generateNumbersAction(arraySize));
    }, [arraySize, dispatch]);

    useEffect(() => {
        GenerateDataGraph(results, results[0].length);
    }, [results, arraySize, sortingInProgressState, factData]);

    return (
        <div style={{ background: colours.background }}>
            <Container
                disableGutters={true}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    background: colours.background
                }}
            >
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
                        <Container disableGutters={true}>
                            <Toolbar disableGutters>
                                {/* App Title */}
                                <Typography
                                    sx={{
                                        mr: 3,
                                        display: { xs: 'flex', md: 'flex' },
                                        color: theme.palette.text.primary,
                                        fontSize: '1.5rem',
                                        padding: '0 0 0 1.6rem'
                                    }}
                                >
                                    {t(`title.mainPage`)}
                                </Typography>

                                {/* Array Size Slider */}
                                <Box
                                    sx={{
                                        maxWidth: 125,
                                        minWidth: 75
                                    }}
                                >
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

                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: { xs: 'flex', md: 'flex' },
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <CustomButton
                                        id="stop-button"
                                        disabled={!sortingInProgressState}
                                        onClick={stopSortingHandler}
                                        width="5rem"
                                    >
                                        {t('buttons.stop')}
                                    </CustomButton>
                                    <CustomButton
                                        id="clear-numbers-button"
                                        disabled={sortingInProgressState}
                                        onClick={RemoveNumberFunction}
                                    >
                                        {t(`buttons.updateNumbers`)}
                                    </CustomButton>

                                    <FormControl
                                        sx={{
                                            width: 175,
                                            height: '3rem'
                                        }}
                                    >
                                        <Select
                                            multiple
                                            displayEmpty
                                            value={selectedAlgorithm}
                                            onChange={algorithmHandleChange}
                                            input={<OutlinedInput />}
                                            renderValue={(selected) => {
                                                if (selected.length === 0) {
                                                    return (
                                                        <em>
                                                            {t(
                                                                `dropDown.pickAlgo`
                                                            )}
                                                        </em>
                                                    );
                                                }

                                                return selected.join(', ');
                                            }}
                                            MenuProps={MenuProps}
                                            inputProps={{
                                                'aria-label': 'Without label'
                                            }}
                                            sx={{
                                                color: colours.secondary
                                            }}
                                        >
                                            <MenuItem disabled value="">
                                                <em></em>
                                            </MenuItem>
                                            {algorithmList.map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                    style={{
                                                        color: colours.primary
                                                    }}
                                                >
                                                    {t(`buttons.${name}`)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <CustomButton
                                        id="start-button"
                                        disabled={
                                            sortingInProgressState ||
                                            selectedAlgorithm.length === 0
                                        }
                                        width="5rem"
                                        onClick={startSorting}
                                    >
                                        {t('buttons.start')}
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
                                        {t(`buttons.iterations`)}:
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                padding: '0.5rem',
                                                borderRadius: '4px',
                                                marginLeft: '0.5rem',
                                                color: colours.primary
                                            }}
                                        >
                                            {selectedAlgorithm.length === 1 &&
                                            selectedAlgorithm.includes(`bubble`)
                                                ? iterationsCompletedState[0]
                                                : selectedAlgorithm.length ===
                                                      1 &&
                                                  selectedAlgorithm.includes(
                                                      `insertion`
                                                  )
                                                ? iterationsCompletedState[1]
                                                : `${iterationsCompletedState[0]}/ ${iterationsCompletedState[1]}`}
                                        </Paper>
                                    </div>
                                    <Checkbox
                                        onClick={handleCheckboxClick}
                                        sx={{ color: colours.error }}
                                        icon={<StickyNote2Icon />}
                                        checkedIcon={
                                            <StickyNote2Icon
                                                sx={{
                                                    color: colours.success
                                                }}
                                            />
                                        }
                                    />

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
                                        label={languageValue ? 'En' : 'Fr'}
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
                {/*++++++++++++ Bar components start here -------------*/}
                <Container
                    maxWidth="xl"
                    style={{
                        marginTop: '2rem',
                        display: 'grid',
                        gridTemplateRows: '1fr 1fr',
                        justifyContent: 'center',
                        minHeight: '20rem'
                    }}
                >
                    {/* Bar Graph */}
                    {selectedAlgorithm.length === 0 ? (
                        <FactCard
                            style={{ width: '20%' }}
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
                        <Box
                            className="row"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: '2rem',
                                width: '100%'
                            }}
                        >
                            <Typography variant="h6">
                                {t(`cards.${selectedAlgorithm[0]}.title`)}
                            </Typography>

                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <BarGraph
                                    style={{ width: '80%' }}
                                    result={
                                        selectedAlgorithm[0] === `insertion`
                                            ? results[1]
                                            : results[0]
                                    }
                                    sortingInProgressState={
                                        sortingInProgressState
                                    }
                                    sorted={sorted}
                                />
                                <FactCard
                                    style={{ width: '20%' }}
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
                        <Box
                            className="row"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginRight: '2rem',
                                width: '100%'
                            }}
                        >
                            <Typography variant="h6">
                                {t(`cards.${selectedAlgorithm[1]}.title`)}
                            </Typography>

                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <BarGraph
                                    style={{ width: '80%' }}
                                    result={
                                        selectedAlgorithm[1] === `insertion`
                                            ? results[1]
                                            : results[0]
                                    }
                                    sortingInProgressState={
                                        sortingInProgressState
                                    }
                                    sorted={sorted}
                                />
                                <FactCard
                                    style={{ width: '20%' }}
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
                <Container
                    disableGutters={true}
                    style={{
                        marginTop: 'auto',
                        width: '100%'
                    }}
                >
                    <Footer />
                </Container>
            </Container>
        </div>
    );
}