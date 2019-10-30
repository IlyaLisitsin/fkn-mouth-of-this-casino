import web3 from './web3';

const address = '0x8636bF3b113a91b65470C346C7A5396fda055f2e';

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
