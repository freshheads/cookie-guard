import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { CookieGuardProvider } from './context/CookieGuardProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookieGuardProvider
            onCookieSettingsChange={(cookieSettings) =>
                console.log('cookies changed', cookieSettings)
            }
            onCookieSettingsCleared={() => console.log('cookies cleared')}
            onCookieSettingsSet={(cookieSettings) =>
                console.log('cookies set', cookieSettings)
            }
        >
            <App />
        </CookieGuardProvider>
    </React.StrictMode>
);
