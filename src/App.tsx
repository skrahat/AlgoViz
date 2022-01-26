import { Button, Typography } from '@mui/material';
import { typography } from '@mui/system';
import React, { useState } from 'react';
import Dashboard from './component/Dashboard';

function App() {
    return (
        <div className="App">
            <Dashboard />
            <div className="Body">
                <Typography></Typography>
            </div>
        </div>
    );
}

export default App;
