import { Typography } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Dashboard from './page/MainPage';

function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <div className="App">
                <Dashboard />
                <div className="Body">
                    <Typography></Typography>
                </div>
            </div>
        </I18nextProvider>
    );
}

export default App;
