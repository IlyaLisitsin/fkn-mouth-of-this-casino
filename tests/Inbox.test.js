const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compile = require('../compile');
const compileInterface = compile.interface;
const bytecode = compile.bytecode;


let accounts;
let inbox;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(compileInterface))
        .deploy({ data: bytecode, arguments: ['Keko testo']})
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has init message', async () => {
        const message = await inbox.methods.message().call();

        assert.equal(message, 'Keko testo')
    });

    it('modifies the message', async () => {
        await inbox.methods.setMessage('well').send({ from: accounts[0], gas: '1000000' });
        const message = await inbox.methods.message().call();

        assert.equal(message, 'well')
    });
});
