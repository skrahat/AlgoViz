import { Typography } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Dashboard } from './page/Dashboard';

function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <div className="App">
                <Dashboard />
            </div>
        </I18nextProvider>
    );
}

export default App;
