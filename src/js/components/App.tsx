import { CookieBanner, CookieBannerProps } from './CookieBanner';
import { useCookies } from '../hooks/useCookies';
import { NeedsCookie } from './NeedsCookies';
import { CookieCategory } from '../types/cookies';
import { BottomBanner } from './examples/BottomBanner';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CornerBanner } from './examples/CornerBanner';
import { WideBottomBanner } from './examples/WideBottomBanner';
import { CenteredBanner } from './examples/CenteredBanner';
import { PrivacyPreferences } from './PrivacyPreferences';

function App() {
    const { clearCookieSettings, setCookieSettings } = useCookies();
    return (
        <div className="container">
            <h1>Freshheads Cookie Guard</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti et illum itaque maxime nemo nesciunt temporibus,
                voluptates. Delectus ipsa ipsum itaque iusto laudantium, minus
                nisi numquam pariatur rerum similique temporibus.
            </p>
            <button onClick={() => clearCookieSettings()}>clearCookies</button>
            <Routes>
                <Route path="/bottom-banner" element={<BottomBanner />} />
                <Route path="/corner-banner" element={<CornerBanner />} />
                <Route
                    path="/wide-bottom-banner"
                    element={<WideBottomBanner />}
                />
                <Route path="/centered-banner" element={<CenteredBanner />} />
            </Routes>
            <PrivacyPreferences />

            <NeedsCookie
                cookieRequirement={CookieCategory.marketing}
                fallback={
                    <div>
                        je mag dit alleen zien als je marketing cookies hebt
                        geaccepteerd.{' '}
                        <button
                            onClick={() =>
                                setCookieSettings({ marketing: true })
                            }
                        >
                            accepteer marketing cookies
                        </button>
                    </div>
                }
            >
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/2_x0LYeGNeM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </NeedsCookie>
        </div>
    );
}

export default App;
