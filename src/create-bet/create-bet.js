import React, { useState } from 'react';
import web3 from '../web3'

import BetFactory from '../bet-factory-instance'

import './styles.css'

function CreateBet({ ws }) {
    const [betValue, setBetValue] = useState(0);
    const [isLoading, setloading] = useState(false);
    const changeBetValue = e => setBetValue(e.target.value);


    const createBet = async () => {
        const accounts = await web3.eth.getAccounts();

        setloading(true);
        await BetFactory.methods.createBetContract().send({
            from: accounts[0],
            value: betValue * 1000000000000000000,
        });

        const betAddress = await BetFactory.methods.betInstanceAddress().call();

        ws.send(JSON.stringify({
            data: {
                creatorAddress: accounts[0],
                betAddress,
                value: betValue * 1000000000000000000,
            },
            event: 'create-bet'
        }));

        setloading(false);
    };


    return (
        <div className="create-bet">
            { isLoading && <div>Creationg your bet</div> }
            <button onClick={createBet}>create bet</button>
            <input onChange={changeBetValue}></input>
        </div>
    )
}

export default CreateBet;
