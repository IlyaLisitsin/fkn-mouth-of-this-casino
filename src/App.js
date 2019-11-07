import React, { useState, useEffect } from 'react';
import BetsList from './bets-list';
import CreateBet from './create-bet';
import ErrorMessage from './error-message'

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
    const [betsList, setbetsList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const w = new WebSocket('ws://127.0.0.1:5500');

        w.onopen = function(event) {
            setLoading(true);
            w.send(JSON.stringify({ event: 'get-all-bets' }))
        };

        w.onmessage = function(event) {
            setbetsList(JSON.parse(event.data));
            setLoading(false);
        };

        w.onclose = function() {
            setErrorMessage('Connection lost :( Try to reload page')
        };

        setWs(w);
    }, []);

    useEffect(() => {
        checkMetamask()
            .then(() => setData(true))
            .catch(() => setData(false));

    }, []);

    return (

            <section className="container">
                {
                    isMetaMaskEnabled ?
                        <div className="main-menu">
                            <CreateBet ws={ws}/>
                            { isLoading ? <div>loading bets list</div> : <BetsList betsList={betsList} ws={ws}/> }
                            { errorMessage && <ErrorMessage message={errorMessage} />}
                        </div> : <p>Install MetaMask and allow interaction</p>
                }
            </section>
    );
}

export default App;
