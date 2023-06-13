import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Slider } from '@mui/material';
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
import CustomButton from '../component/Button';
import {
    generateNumbers,
    sortInProgess,
    iterationsCompleted
} from '../redux/reducers/actions';
import { BubbleSort, InsertionSort } from '../component/Algorithms';

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
    const dispatch = useDispatch();
    const result = useSelector((state: any) => state.result);
    //const displayComplete = useSelector((state: any) => state.displayComplete);
    const [arraySize, setArraySize] = React.useState(20);
    const sortingInProgressState = useSelector(
        (state: any) => state.sortInProgess
    );
    const iterationsCompletedState = useSelector(
        (state: any) => state.iterationsCompleted
    );

    const RandomNumberGeneratorFunction = () => {
        dispatch(generateNumbers(arraySize));
    };

    const GenerateDataGraph = (arrayX: number[], arrayY: number) => {
        var result: any = [];
        for (var i = 0; i < arrayY; i++) {
            result.push({ x: arrayX[i], y: i });
        }

        return result;
    };

    const data = {
        datasets: [
            {
                label: 'Numbers',
                data: GenerateDataGraph(result, arraySize),
                backgroundColor: 'rgba(55, 99, 132, 1)'
            }
        ]
    };

    const RemoveNumberFunction = () => {
        dispatch(generateNumbers(0));
    };

    const bubbleSort = async () => {
        console.log('started bubble sort');
        dispatch(iterationsCompleted(true));
        dispatch(sortInProgess());
        BubbleSort(result, dispatch);
    };
    const insertionSort = async () => {
        console.log('started Insertion sort');
        dispatch(iterationsCompleted(true));
        dispatch(sortInProgess());
        InsertionSort(result, dispatch);
    };
    const handleChange = (event: Event, value: number | number[]) => {
        if (typeof value === 'number') setArraySize(value);
    };

    const changeLanguageHandler = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        GenerateDataGraph(result, arraySize);
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
                                    disabled={sortingInProgressState}
                                    onClick={() =>
                                        RandomNumberGeneratorFunction()
                                    }
                                >
                                    {t('Generate Numbers')}
                                </CustomButton>

                                <CustomButton
                                    id="clearNumberID"
                                    disabled={sortingInProgressState}
                                    onClick={() => RemoveNumberFunction()}
                                >
                                    {t('Remove Numbers')}
                                </CustomButton>

                                <CustomButton
                                    id="bubble-sort-button"
                                    disabled={sortingInProgressState}
                                    onClick={() => bubbleSort()}
                                >
                                    {t('Bubble sort')}
                                </CustomButton>

                                <CustomButton
                                    id="Insertion-sort-button"
                                    disabled={sortingInProgressState}
                                    onClick={() => insertionSort()}
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
                                <Typography
                                    sx={{
                                        mr: 3,
                                        display: { xs: 'none', md: 'flex' },
                                        color: theme.palette.text.primary,
                                        fontSize: '1.5rem'
                                    }}
                                >
                                    {t(`Iterations`) +
                                        ': ' +
                                        iterationsCompletedState}
                                </Typography>

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
            {/* <div text-align="center">
                {result.map((item, i) => (
                    <p id="generated-numbers" key={i}>
                        {item}
                    </p>
                ))}
            </div> */}

            <Scatter options={options} data={data} />
            <h1>{sortingInProgressState ? 'Sorting in progress' : ''}</h1>
        </div>
    );
}
