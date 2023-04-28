import React, {FC, useEffect, useRef} from 'react';

const CookiePopup: FC = () => {
    const dialogElement = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (dialogElement.current && dialogElement.current?.open === false) {
            dialogElement.current?.showModal();
        }
    }, [])

    return (
        <dialog className="cookie-alert" ref={dialogElement}>
            <h1 className="cookie-alert__title">Cookie Popup</h1>
            <p className="cookie-alert__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem delectus doloribus ex inventore iusto non odit, possimus quas quos ratione sed vitae voluptates. Debitis id laborum natus quasi repudiandae!</p>
        </dialog>
    );
};

export default CookiePopup;
