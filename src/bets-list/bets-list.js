import React from 'react';
import TakeBetButton from '../take-bet-button';

import './styles.css'

function BetsList({ betsList, ws }) {
    return (
        <div className="players-list">
            <ul>{betsList.map(bet =>
                <div key={bet._id}>
                    <li>{JSON.stringify(bet)}</li>
                    <TakeBetButton betAddress={bet.betAddress} betId={bet._id} betValue={bet.value} ws={ws} />
                </div>)}
            </ul>
        </div>
    )
}

export default BetsList;
