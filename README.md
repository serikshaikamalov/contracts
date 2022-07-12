# contracts

Smart contracts for Nuqtah platform.

## Compile

```sh
npx hardhat compile
```

To get bin and ABI, after `compile`, open `artifacts/contracts/contractname.json` then:

* Copy `bytecode` field and save it to a contractname.bin
* Copy `abi` field and save it to contractname.abi

## Generating Code

This requires [web3 cli tool](https://github.com/gochain/web3):

```sh
curl -LSs https://raw.githubusercontent.com/gochain/web3/master/install.sh | sh
web3 generate code --abi ERC721v1.abi --pkg ERC721
```

## Deploying

Should deploy from code for users, but to manually deploy to test:

```sh
export WEB3_PRIVATE_KEY=XXX
export WEB3_RPC_URL=YYY
web3 contract deploy --gas-limit 10000000 contracts/ERC721v1.bin NUQTAH NUQTAH https://treeder-nuqtah-api-6v7w7qf4q9-8080.githubpreview.dev/v1/collections/WeliHA9t9HyHi2EbKAc9/metadata/ 0x40433dB26CD2581767eB372cBB4d513Ea550F652
```

To mint from the command line:

```sh
 web3 contract call --abi contracts/ERC721v1.abi --address 0x3ceea40c1b0759de0cd65b1151abb25bd9328950 --function safeMint 0xD5CedcDC13B20D917938Ca05dA04DE06590deCF2 1
 ```

 