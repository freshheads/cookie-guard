import React, {FC} from 'react';

const CookiePopup: FC = () => {
    return (
        <dialog className="cookie-alert" open>
            <h1 className="cookie-alert__title">Cookie Popup</h1>
            <p className="cookie-alert__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem delectus doloribus ex inventore iusto non odit, possimus quas quos ratione sed vitae voluptates. Debitis id laborum natus quasi repudiandae!</p>
        </dialog>
    );
};

export default CookiePopup;
