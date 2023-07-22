import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import BarGraph from './BarGraph';
import FactCard from '../UIComponents/FactCard';
import { t } from 'i18next';
interface cardType {
    title: string;
    description1: string;
    description2: string;
    style?: React.CSSProperties;
}
interface graphProps {
    sortingInProgressState: any;
    resultTwo: any;
    selectedAlgorithm: any;
    sorted: any;
    card?: cardType;
    style?: React.CSSProperties;
}

const GraphComponent: React.FC<graphProps> = ({
    sortingInProgressState,
    resultTwo,
    selectedAlgorithm,
    sorted,
    style
}) => {
    return (
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
            {selectedAlgorithm.length === 2 &&
            selectedAlgorithm.includes(`insertion`) ? (
                <Typography variant="h6">{t(`cards.insertionSort`)}</Typography>
            ) : (
                ''
            )}

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
                    result={resultTwo}
                    sortingInProgressState={sortingInProgressState}
                    sorted={sorted}
                />
                <FactCard
                    style={{ width: '20%' }}
                    title={t(`cards.bubble.title`)}
                    description1={t(`cards.bubble.description1`)}
                    description2={t(`cards.bubble.description2`)}
                />
            </div>
        </Box>
    );
};
export default GraphComponent;
