import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface CustomAlertProps {
    message: string;
    open: boolean;
    severity?: 'error' | 'warning' | 'info' | 'success';
    handleClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
    message,
    severity,
    open,
    handleClose
}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
