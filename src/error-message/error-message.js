import React from 'react';

import './styles.css'

function ErrorMessage({ message }) {
    return (
        <div>
            <div className="error-message">{message}</div>
            <div className="overlay"></div>
        </div>
    )
}

export default ErrorMessage;
