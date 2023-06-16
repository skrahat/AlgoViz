import React, { useEffect } from 'react';
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
import { Bar } from 'react-chartjs-2'; // Import Bar from react-chartjs-2
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../component/Button';
import {
    generateNumbersAction,
    sortInProgressAction,
    iterationsCompletedAction
} from '../redux/reducers/actions';
import { BubbleSort, InsertionSort } from '../component/Algorithms';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale, // Import CategoryScale from chart.js
    BarElement // Import BarElement from chart.js
} from 'chart.js';

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

ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale, // Register CategoryScale
    BarElement // Register BarElement
);

export const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

export default function Dashboard(): JSX.Element {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { result, sorted, generateNumbers, sortInProgess } = useSelector(
        (state: any) => state
    );

    const [arraySize, setArraySize] = React.useState<number>(10);
    const sortingInProgressState = useSelector(
        (state: any) => state.sortInProgess
    );
    const iterationsCompletedState = useSelector(
        (state: any) => state.iterationsCompleted
    );

    const RandomNumberGeneratorFunction = () => {
        dispatch(generateNumbersAction(arraySize));
    };

    const GenerateDataGraph = (
        arrayX: number[],
        arrayY: number
    ): { x: number; y: number }[] => {
        var result: { x: number; y: number }[] = [];
        for (var i = 0; i < arrayY; i++) {
            result.push({ x: i, y: arrayX[i] });
        }
        return result;
    };

    const data = {
        labels: GenerateDataGraph(result, result.length).map((item) => item.x), // Extract x values as labels
        datasets: [
            {
                data: [2],
                // GenerateDataGraph(result, result.length).map(
                //     (item) => item.y
                // ), // Extract y values as data
                backgroundColor: ['rgba(55, 99, 132, 1)']
            },
            {
                data: [3],
                // GenerateDataGraph(result, result.length).map(
                //     (item) => item.y
                // ), // Extract y values as data
                backgroundColor: ['rgba(54, 162, 235, 1)']
            },
            {
                data: [4],
                // GenerateDataGraph(result, result.length).map(
                //     (item) => item.y
                // ), // Extract y values as data
                backgroundColor: ['rgba(54, 162, 235, 1)']
            }
        ]
    };

    const RemoveNumberFunction = () => {
        dispatch(iterationsCompletedAction(true));
        dispatch(generateNumbersAction(0));
    };

    const bubbleSort = async () => {
        console.log('started bubble sort');
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        // if (sorted) {
        //     BubbleSort(generatedNumbers, dispatch);
        // } else
        BubbleSort(result, dispatch);
    };

    const insertionSort = async () => {
        console.log('started Insertion sort');
        dispatch(iterationsCompletedAction(true));
        dispatch(sortInProgressAction());
        // if (sorted) {
        //     InsertionSort(generatedNumbers, dispatch);
        // } else
        InsertionSort(result, dispatch);
    };

    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') setArraySize(value);
    };

    const changeLanguageHandler = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        GenerateDataGraph(result, result.length);
    }, [result, arraySize]);

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
                                {t(`AlgoViz`)}
                            </Typography>
                            <Box sx={{ width: 100, padding: '0.4rem' }}>
                                <Slider
                                    value={arraySize}
                                    min={20}
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
                                    display: { xs: 'none', md: 'flex' }
                                }}
                            >
                                <CustomButton
                                    id="generateNumberID"
                                    disabled={sortingInProgressState}
                                    onClick={RandomNumberGeneratorFunction}
                                >
                                    {t('Generate Numbers')}
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
            <Bar options={options} data={data} /> {/* Use Bar chart */}
            <h1>{sortingInProgressState ? 'Sorting in progress' : ''}</h1>
        </div>
    );
}
