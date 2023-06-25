export type BankUseCivic = {
  "version": "0.1.0",
  "name": "bank_use_civic",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "bank",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "gatekeeperNetwork",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enter",
      "accounts": [
        {
          "name": "bank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gatewayToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "customer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bank",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "gatekeeperNetwork",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};

export const IDL: BankUseCivic = {
  "version": "0.1.0",
  "name": "bank_use_civic",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "bank",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "gatekeeperNetwork",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "enter",
      "accounts": [
        {
          "name": "bank",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gatewayToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "customer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "bank",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "gatekeeperNetwork",
            "type": "publicKey"
          }
        ]
      }
    }
  ]
};
