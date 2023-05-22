async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const gas = await ethers.provider.getGasPrice();
  const cloneContract = await ethers.getContractFactory("CloneFactory");
  const cloneFactory = await cloneContract.deploy();
  console.log("TX:", cloneFactory.deployTransaction.hash)
  console.log("Cloner contract address, add this to .env config as FACTORY_ADDRESS:", cloneFactory.address);  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
