import { ReactNode } from 'react';
import { CookieGuard } from './CookieGuard';

const cookieProps = {
    title: 'Onze site maakt gebruik van cookies.',
    beforeOptions:
        'Wij gebruiken cookies voor de werking van de website, analyse en verbetering en marketingdoeleinden.',
};

function App() {
    return (
        <div className="container">
            <h1>Freshheads Cookie Guard</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti et illum itaque maxime nemo nesciunt temporibus,
                voluptates. Delectus ipsa ipsum itaque iusto laudantium, minus
                nisi numquam pariatur rerum similique temporibus.
            </p>

            <CookieGuard {...cookieProps} />
        </div>
    );
}

export default App;
