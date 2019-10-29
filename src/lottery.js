import web3 from './web3';

const address = '0x3F6549d4Ee92627e1621d15cAdE5Cf52b8c061D3';

const abi = [
    {
        constant: true,
        inputs: [],
        name: 'manager',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'pickWinner',
        outputs: [{ name: '', type: 'uint256' }],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [],
        name: 'getPlayers',
        outputs: [{ name: '', type: 'address[]' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: false,
        inputs: [],
        name: 'enter',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{ name: '', type: 'uint256' }],
        name: 'players',
        outputs: [{ name: '', type: 'address' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    { inputs: [], payable: true, stateMutability: 'payable', type: 'constructor' }
];

export default new web3.eth.Contract(abi, address);
