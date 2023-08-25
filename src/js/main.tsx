import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { CookieGuardProvider } from './context/CookieGuardProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookieGuardProvider
            onCookieSettingsChange={(cookieSettings) =>
                console.log('cookies changed', cookieSettings)
            }
            onCookieSettingsSet={(cookieSettings) =>
                console.log('cookies set', cookieSettings)
            }
        >
            <BrowserRouter>
                <ChakraProvider>
                    <App />
                </ChakraProvider>
            </BrowserRouter>
        </CookieGuardProvider>
    </React.StrictMode>
);
