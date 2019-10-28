const assert = require('assert');
const expect = require('chai').expect;
const chai = require('chai')
chai.use(require('chai-as-promised'))

const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const compile = require('../compile');
const compileInterface = compile.interface;
const bytecode = compile.bytecode;


let accounts;
let lottery;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(compileInterface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000', value: web3.utils.toWei('1', 'ether') })
});

describe('lottery', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allowa one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(players.length, 1);
    });

    it('allowa mult acccounts', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether'),
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('10', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        })

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);

        assert.equal(players.length, 2);
    });

    it('requires min amount of eth', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: '100',
            });

            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('only manager picks a winner', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether'),
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('10', 'ether'),
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0],
        });

        const winnerIndex = await lottery.methods.pickWinner().call({
            from: players[0]
        });

        expect(players[winnerIndex]).not.to.be.undefined;

        const shouldThrow = async () => {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        }

        await expect(lottery.methods.pickWinner().send({
            from: accounts[1]
        })).to.be.rejectedWith(Error);
    })

    it('sends money to the winner and resets the arr', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether'),
        });

        const initBallance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finBallance = await web3.eth.getBalance(accounts[0]);

        assert((finBallance - initBallance) > web3.utils.toWei('9.8', 'ether'))
    });
});
