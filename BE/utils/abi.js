module.exports = 	[
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"name": "data",
		"outputs": [
			{
				"name": "size",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "deactivateID",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getAllPubKey",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "keyType",
						"type": "string"
					},
					{
						"name": "controller",
						"type": "string[]"
					},
					{
						"name": "pubKeyData",
						"type": "bytes"
					},
					{
						"name": "deactivated",
						"type": "bool"
					},
					{
						"name": "isPubKey",
						"type": "bool"
					},
					{
						"name": "authIndex",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "singer",
				"type": "bytes"
			}
		],
		"name": "verifySignature",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "dataId",
				"type": "string"
			}
		],
		"name": "dataSize",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "serviceId",
				"type": "string"
			},
			{
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "addService",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getContext",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "singer",
				"type": "bytes"
			}
		],
		"name": "verifyDIDSignature",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "contexts",
				"type": "string[]"
			}
		],
		"name": "removeContext",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getDocument",
		"outputs": [
			{
				"components": [
					{
						"name": "context",
						"type": "string[]"
					},
					{
						"name": "id",
						"type": "string"
					},
					{
						"components": [
							{
								"name": "id",
								"type": "string"
							},
							{
								"name": "keyType",
								"type": "string"
							},
							{
								"name": "controller",
								"type": "string[]"
							},
							{
								"name": "pubKeyData",
								"type": "bytes"
							},
							{
								"name": "deactivated",
								"type": "bool"
							},
							{
								"name": "isPubKey",
								"type": "bool"
							},
							{
								"name": "authIndex",
								"type": "uint256"
							}
						],
						"name": "publicKey",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"name": "id",
								"type": "string"
							},
							{
								"name": "keyType",
								"type": "string"
							},
							{
								"name": "controller",
								"type": "string[]"
							},
							{
								"name": "pubKeyData",
								"type": "bytes"
							},
							{
								"name": "deactivated",
								"type": "bool"
							},
							{
								"name": "isPubKey",
								"type": "bool"
							},
							{
								"name": "authIndex",
								"type": "uint256"
							}
						],
						"name": "authentication",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"name": "serviceId",
								"type": "string"
							},
							{
								"name": "publicKey",
								"type": "string"
							}
						],
						"name": "service",
						"type": "tuple[]"
					},
					{
						"name": "updated",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "serviceId",
				"type": "string"
			},
			{
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "updateService",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "setAuthKey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "dataId",
				"type": "string"
			},
			{
				"name": "key",
				"type": "bytes32"
			}
		],
		"name": "dataValue",
		"outputs": [
			{
				"name": "",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"name": "didStatus",
		"outputs": [
			{
				"name": "deactivated",
				"type": "bool"
			},
			{
				"name": "authListLen",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getUpdatedTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "pubKey",
				"type": "bytes"
			},
			{
				"name": "controller",
				"type": "string[]"
			}
		],
		"name": "addNewAuthKey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "contexts",
				"type": "string[]"
			}
		],
		"name": "addContext",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getAllAuthKey",
		"outputs": [
			{
				"components": [
					{
						"name": "id",
						"type": "string"
					},
					{
						"name": "keyType",
						"type": "string"
					},
					{
						"name": "controller",
						"type": "string[]"
					},
					{
						"name": "pubKeyData",
						"type": "bytes"
					},
					{
						"name": "deactivated",
						"type": "bool"
					},
					{
						"name": "isPubKey",
						"type": "bool"
					},
					{
						"name": "authIndex",
						"type": "uint256"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "deactivateKey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "deactivateAuthKey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "serviceId",
				"type": "string"
			}
		],
		"name": "removeService",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			}
		],
		"name": "getAllService",
		"outputs": [
			{
				"components": [
					{
						"name": "serviceId",
						"type": "string"
					},
					{
						"name": "publicKey",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "singer",
				"type": "bytes"
			}
		],
		"name": "checkWhenOperate",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "newPubKey",
				"type": "bytes"
			},
			{
				"name": "controller",
				"type": "string[]"
			}
		],
		"name": "addKey",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			}
		],
		"name": "Deactivate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pubKey",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "controller",
				"type": "string[]"
			}
		],
		"name": "AddKey",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "DeactivateKey",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pubKey",
				"type": "bytes"
			},
			{
				"indexed": false,
				"name": "controller",
				"type": "string[]"
			}
		],
		"name": "AddNewAuthKey",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "SetAuthKey",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pubKey",
				"type": "bytes"
			}
		],
		"name": "DeactivateAuthKey",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "context",
				"type": "string"
			}
		],
		"name": "AddContext",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "context",
				"type": "string"
			}
		],
		"name": "RemoveContext",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "serviceId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "AddService",
				"type": "string"
			}
		],
		"name": "AddService",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "serviceId",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "publicKey",
				"type": "string"
			}
		],
		"name": "UpdateService",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "did",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "serviceId",
				"type": "string"
			}
		],
		"name": "RemoveService",
		"type": "event"
	}
]