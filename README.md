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
