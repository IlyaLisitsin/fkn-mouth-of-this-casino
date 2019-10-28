import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function checkMetamask() {
    if (window.ethereum) {
        return window.ethereum.enable()
    } else {
        return new Promise((resolve, reject) => reject(false))
    }
}

function App() {
    const [isMetaMaskEnabled, setData] = useState(false);

    useEffect(() => {
        checkMetamask()
            .then(() => setData(true))
            .catch(() => setData(false));
    }, []);

    return (

        isMetaMaskEnabled ?
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div> : <p>Sas</p>
    );
}

export default App;
