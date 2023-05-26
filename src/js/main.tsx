import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { CookieGuardProvider } from './context/CookieGuardProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CookieGuardProvider
            onCookiesChange={(cookies) =>
                console.log('cookies changed', cookies)
            }
            onCookiesCleared={() => console.log('cookies cleared')}
            onCookiesSet={(cookies) => console.log('cookies set', cookies)}
        >
            <App />
        </CookieGuardProvider>
    </React.StrictMode>
);
