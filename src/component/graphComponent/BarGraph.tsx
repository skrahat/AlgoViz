import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import {
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { colours } from '../../styling/colours';

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip
);
interface BarGraphProps {
    result: { color: string; value: number }[];
    sortingInProgressState: boolean;
    sorted: boolean;
    style?: React.CSSProperties;
}

const BarGraph: React.FC<BarGraphProps> = ({
    result,
    sortingInProgressState,
    sorted,
    style
}) => {
    // Generate and memoize the data for the Bar chart
    const chartData = useMemo(() => {
        const GenerateDataGraph = (
            arrayX: { color: string; value: number }[],
            arrayY: number
        ) => {
            var result: { x: number; y: number }[] = [];
            for (var i = 0; i < arrayY; i++) {
                result.push({ x: i, y: arrayX[i].value });
            }
            return result;
        };

        const GenerateDataColourGraph = (
            arrayX: { color: string; value: number }[],
            arrayY: number
        ) => {
            var result: string[] = [];
            for (var i = 0; i < arrayY; i++) {
                result.push(arrayX[i].color);
            }
            return result;
        };

        return {
            labels: GenerateDataGraph(result, result.length).map(
                (item) => item.x
            ),
            datasets: [
                {
                    label: 'Numbers',
                    data: GenerateDataGraph(result, result.length),
                    backgroundColor: sortingInProgressState
                        ? GenerateDataColourGraph(result, result.length)
                        : sorted
                        ? GenerateDataColourGraph(result, result.length).map(
                              (color: string) =>
                                  color === colours.error
                                      ? colours.error
                                      : colours.success
                          )
                        : Array(result.length).fill(colours.accent),
                    barThickness: 4
                }
            ]
        };
    }, [result, sortingInProgressState, sorted]);

    // Memoize the options for the Bar chart
    const chartOptions = useMemo(() => {
        return {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    title: {
                        display: true,
                        text: 'Size'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 0
            }
        };
    }, []);

    return (
        <div style={style}>
            <Bar options={chartOptions} data={chartData} />
        </div>
    );
};

export default BarGraph;
