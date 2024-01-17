import { SnackbarProvider } from 'notistack';
import { Router } from './routes';
import { GlobalProvider } from './providers/GlobalContext';
import './App.css'
import { Box } from '@mui/material';
import { parse, stringify } from 'flatted';

export const App = () => {
    
    return (
        <SnackbarProvider>
            <GlobalProvider>
                <Router />
            </GlobalProvider>
        </SnackbarProvider>
    );
}
