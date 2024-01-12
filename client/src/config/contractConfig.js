export const contractAddress = '0x152146bAF08e675035bB3a6e0847245d35915431'; // Địa chỉ của smart contract
export const contractABI = [
    {
        inputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'string[]',
                name: 'size',
                type: 'string[]',
            },
            {
                internalType: 'string[]',
                name: 'color',
                type: 'string[]',
            },
            {
                internalType: 'string',
                name: 'desc',
                type: 'string',
            },
        ],
        name: 'addProduct',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'deleteProduct',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'ProductAdded',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'ProductDeleted',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'ProductUpdated',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'string[]',
                name: 'size',
                type: 'string[]',
            },
            {
                internalType: 'string[]',
                name: 'color',
                type: 'string[]',
            },
            {
                internalType: 'string',
                name: 'desc',
                type: 'string',
            },
        ],
        name: 'updateProduct',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'getProduct',
        outputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'string[]',
                name: 'size',
                type: 'string[]',
            },
            {
                internalType: 'string[]',
                name: 'color',
                type: 'string[]',
            },
            {
                internalType: 'string',
                name: 'desc',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'getProductById',
        outputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'string[]',
                name: 'size',
                type: 'string[]',
            },
            {
                internalType: 'string[]',
                name: 'color',
                type: 'string[]',
            },
            {
                internalType: 'string',
                name: 'desc',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'productCount',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'products',
        outputs: [
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'uint256',
                name: 'price',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'quantity',
                type: 'uint256',
            },
            {
                internalType: 'string',
                name: 'desc',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
