async function main() {
  const [deployer] = await ethers.getSigners();  
  const factoryAddress = process.env.FACTORY_ADDRESS;
  const tokenName = process.env.TOKEN_NAME;
  const tokenSymbol = process.env.TOKEN_SYMBOL;
  const tokenURI = process.env.TOKEN_URI;
  console.log("Account",deployer.address, "balance:", (await deployer.getBalance()).toString());
  const { interface } = await ethers.getContractFactory('CloneFactory');
  var instance = new ethers.Contract(factoryAddress, interface, deployer);
  const tx1 = await instance.createToken(tokenName, tokenSymbol, tokenURI, deployer.address);
  var { gasUsed: createGasUsed, events } = await tx1.wait();
  var { address } = events.find(Boolean);
  console.log("Created a new token with address:", address, "gas used:", createGasUsed.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
