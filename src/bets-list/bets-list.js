import React  from 'react';

import './styles.css';
import web3 from "../web3";
import BetFactory from "../contracts-build/Bet";

function BetsList({ betsList, ws }) {
    // const [isLoading, setloading] = useState(false);

    const takeBetClick = async ({ betAddress, betId, betValue }) => {
        const bet = new web3.eth.Contract(
            JSON.parse(BetFactory.interface),
            betAddress,
        );

        const accounts = await web3.eth.getAccounts();

        // setloading(true);
        bet.methods.enter().send({
            from: accounts[0],
            value: betValue,
        })
            .then(() => {
                ws.send(JSON.stringify({
                    event: 'fulfill-bet',
                    data: { betId }
                }));

                // setloading(false);
            })
            // .catch(() => setloading(false));
    };

    return (
        <div className="players-list">
            <ul>{betsList.map(bet =>
                <div className="list-container" key={bet._id}>
                    <li onClick={() => takeBetClick({ betAddress: bet.betAddress, betId: bet._id, betValue: bet.value })}>{JSON.stringify(bet.value / 1000000000000000000)}</li>
                </div>)}
            </ul>
        </div>
    )
}

export default BetsList;
