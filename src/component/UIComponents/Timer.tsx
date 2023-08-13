import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

interface TimerProps {
    inProgress: boolean;
    showMilliseconds?: boolean;
}

const Timer: React.FC<TimerProps> = ({
    inProgress,
    showMilliseconds = false
}) => {
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (inProgress) {
            intervalId = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 100); // Increment by 100ms
            }, 100); // Update every 100ms
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [inProgress]);

    const formatTime = (time: number) => {
        if (showMilliseconds) {
            return `${(time / 1000).toFixed(2)} s`;
        } else {
            return `${Math.floor(time / 1000)} s`;
        }
    };

    return (
        <Typography variant="body2" color="inherit">
            Time: {formatTime(timeElapsed)}
        </Typography>
    );
};

export default Timer;
