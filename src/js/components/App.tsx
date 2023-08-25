import { CookieBanner, CookieBannerProps } from './CookieBanner';
import { useCookies } from '../hooks/useCookies';
import { NeedsCookie } from './NeedsCookies';
import { CookieCategory } from '../types/cookies';
import { BottomBanner } from './examples/BottomBanner';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CornerBanner } from './examples/CornerBanner';
import { WideBottomBanner } from './examples/WideBottomBanner';
import { CenteredBanner } from './examples/CenteredBanner';

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

            <Routes>
                <Route path="/bottom-banner" element={<BottomBanner />} />
                <Route path="/corner-banner" element={<CornerBanner />} />
                <Route
                    path="/wide-bottom-banner"
                    element={<WideBottomBanner />}
                />
                <Route path="/centered-banner" element={<CenteredBanner />} />
            </Routes>

            <h2 style={{ marginTop: '24px', fontSize: '24px' }}>
                Cookie banners
            </h2>
            <ul>
                <li>
                    <Link to="/bottom-banner">Bottom banner</Link>
                </li>
                <li>
                    <Link to="/corner-banner">Corner banner</Link>
                </li>
                <li>
                    <Link to="/wide-bottom-banner">Wide bottom banner</Link>
                </li>
                <li>
                    <Link to="/centered-banner">Centered banner</Link>
                </li>
            </ul>
        </div>
    );
}

export default App;
