import web3 from './web3';
import BetFactory from './contracts-build/BetFactory';

let instance;

console.log('web3', web3)

if (web3) {
    new web3.eth.Contract(
        JSON.parse(BetFactory.interface),
        '0xAB3cEcca29f382Bb1dc00f1cbe7b27faCdCCFaD9',
    );
}

export default instance;
