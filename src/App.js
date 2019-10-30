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
    const [betValue, setSetBetValue] = useState(0);
    const [message, setMessage] = useState('');

    const getPlayers = async () => {
        const players = await lottery.methods.getPlayers().call();
        setPlayers(players);

    };

    const getBalance = async () => {
        const balance = await web3.eth.getBalance(lottery.options.address);
        setBalance(balance);
    };

    useEffect(() => {
        checkMetamask()
            .then(() => setData(true))
            .catch(() => setData(false));


        async function init() {
            const manager = await lottery.methods.manager().call();
            getPlayers();
            getBalance();

            setManager(manager);
        }

        init();

    }, []);

    const handleInputChange = e => {
        e.preventDefault();
        setSetBetValue(e.target.value);
    };

    const submitClick = async () => {
        const accounts = await web3.eth.getAccounts();

        setMessage('Entering you');
        await lottery.methods.enter().send({
            from: accounts[0],
            value: betValue * 1000000000000000000,
        }).catch(() => alert('Transaction was declined'));

        getPlayers();

        setMessage('');
    };

    const pickWinner = async () => {
        setMessage('Picking the winner');

        await lottery.methods.pickWinner().send({
            from: manager,
        });

        getPlayers();
        getBalance();
    };

    return (

            <section className="container">
                {
                    isMetaMaskEnabled ?
                        <div className="main-menu">
                            {message && <p className="message">{message}</p>}
                            <div>Managed by {manager}</div>
                            <div>Balance: {web3.utils.fromWei(String(balance), 'ether')} eth</div>
                            <div className="players-list">
                                <p>Players list:</p>
                                <ul>{players.map(player => <li key={player}>{player}</li>)}</ul>
                            </div>
                            <div className="bet-menu">
                                <h4>Your bet</h4>
                                <input onChange={handleInputChange} value={betValue}/>
                                <button onClick={submitClick}>I'm lucky</button>
                                <button onClick={pickWinner}>Pick winner</button>
                            </div>
                        </div> : <p>Install MetaMask and allow interaction</p>
                }
            </section>
    );
}

export default App;
