import { CookieBanner, CookieBannerProps } from './CookieBanner';
import { useCookies } from '../hooks/useCookies';
import { NeedsCookie } from './NeedsCookies';
import { CookieCategory } from '../types/cookies';
import { BottomBanner } from './examples/BottomBanner';

const cookieProps: CookieBannerProps = {
    title: 'Onze site maakt gebruik van cookies.',
    description:
        'Wij gebruiken cookies voor de werking van de website, analyse en verbetering en marketingdoeleinden.',
    acceptAllLabel: 'Alle cookies accepteren',
    saveLabel: 'Opslaan',
    requiredLabel: 'Noodzakelijke cookies',
    functionalLabel: 'Functionele cookies',
    analyticsLabel: 'Analytische cookies',
    marketingLabel: 'Marketing cookies',
};

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
            <BottomBanner />

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
