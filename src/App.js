import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import web3 from './web3';
import lottery from  './lottery';

function checkMetamask() {
    if (window.ethereum) {
        return window.ethereum.enable()
    } else {
        return new Promise((resolve, reject) => reject(false))
    }
}

function App() {
    const [isMetaMaskEnabled, setData] = useState(false);
    const [manager, setManager] = useState(null);
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {

        console.log('her')
        checkMetamask()
            .then(() => setData(true))
            .catch(() => setData(false));

        async function init() {
            const manager = await lottery.methods.manager().call();
            const players = await lottery.methods.getPlayers().call();
            const balance = await web3.eth.getBalance(lottery.options.address);

            setManager(manager);
            setPlayers(players);
            setBalance(balance);
        }

        init();

    }, []);
    return (
        isMetaMaskEnabled ?
        <div className="App">
            <div>Managed by {manager}</div>
            <div>Balance: {web3.utils.fromWei(String(balance), 'ether')} eth</div>
            <ul>{players.map(player => <li>{player}</li>)}</ul>
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
