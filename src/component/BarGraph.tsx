import React from 'react';
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
import { colours } from '../styling/colours';

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
}

const BarGraph: React.FC<BarGraphProps> = ({
    result,
    sortingInProgressState,
    sorted
}) => {
    Chart.register(
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip
    );

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

    const data = {
        labels: GenerateDataGraph(result, result.length).map((item) => item.x),
        datasets: [
            {
                label: 'Numbers',
                data: GenerateDataGraph(result, result.length),
                backgroundColor: sortingInProgressState
                    ? GenerateDataColourGraph(result, result.length)
                    : sorted
                    ? GenerateDataColourGraph(result, result.length).map(
                          (color) =>
                              color === colours.error
                                  ? colours.error
                                  : colours.success
                      )
                    : Array(result.length).fill(colours.accent)
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Remove x-axis grid lines
                }
            },
            y: {
                grid: {
                    display: false // Remove y-axis grid lines
                }
            }
        }
    };

    return <Bar options={options} data={data} />;
};

export default BarGraph;
