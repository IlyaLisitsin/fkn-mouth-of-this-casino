import React, { useState } from 'react';

import './styles.css'

import web3 from '../web3';
import BetFactory from '../contracts-build/Bet';


function TakeBetButton({ betId, betAddress, betValue, ws }) {
    const [isLoading, setloading] = useState(false);

    const takeBetClick = async () => {
        const bet = new web3.eth.Contract(
            JSON.parse(BetFactory.interface),
            betAddress,
        );

        const accounts = await web3.eth.getAccounts();

        setloading(true);
        bet.methods.enter().send({
            from: accounts[0],
            value: betValue,
        })
            .then(() => {
                ws.send(JSON.stringify({
                    event: 'fulfill-bet',
                    data: { betId }
                }));

                setloading(false);
            })
            .catch(() => setloading(false));
    };

    return (
        <div>
            <button onClick={takeBetClick}>I'm lucky</button>
            { isLoading && <div>Picking the winner!</div> }
        </div>
    )
}

export default TakeBetButton;
