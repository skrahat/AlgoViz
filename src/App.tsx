import { Button, Typography } from '@mui/material';
import { typography } from '@mui/system';
import React, { useState } from 'react';
import Header from './component/Dashboard';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="Body">
                <Typography></Typography>
            </div>
        </div>
    );
}

export default App;
