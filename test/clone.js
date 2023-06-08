const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, } = require('hardhat');
require("@nomiclabs/hardhat-web3");
const { expect } = require("chai");

describe("ERC721 Clone contract", function () {
  before(async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    this.owner = owner;
    this.addr1 = addr1;
    this.addr2 = addr2;
    const clone = await ethers.getContractFactory("CloneFactory");
    this.factory = await clone.deploy();
  });
  tokenURI = "http://sample.uri/"
  it("Testing clone", async function () {
    const tokenID = 123456
    //Contract 1
    const tx1 = await this.factory.createToken('SomeName', 'SomeSymbol', tokenURI, this.addr1.address);
    var { gasUsed: createGasUsed, events } = await tx1.wait();
    var { address } = events.find(Boolean);
    console.log("Created a new token with address:", address, "gas used:", createGasUsed.toString());
    const { interface } = await ethers.getContractFactory('ERC721v2');
    var instance = new ethers.Contract(address, interface, this.owner);
    expect(await instance.name()).to.equal("SomeName"); //check name
    expect(await instance.hasRole(await instance.MINTER_ROLE(), this.owner.address)).to.equal(true); //has a minter role
    await instance.connect(this.owner).safeMint(this.addr1.address, tokenID);
    expect(await instance.ownerOf(tokenID)).to.equal(this.addr1.address);
    await instance.connect(this.addr1).transferFrom(this.addr1.address, this.addr2.address, tokenID);
    expect(await instance.ownerOf(tokenID)).to.equal(this.addr2.address);
    expect(await instance.tokenURI(tokenID)).to.equal(tokenURI+tokenID.toString());

    //Contract 2
    const tx2 = await this.factory.createToken('SomeName2', 'SomeSymbol2', tokenURI, this.addr1.address);
    var { gasUsed: createGasUsed, events } = await tx2.wait();
    var { address } = events.find(Boolean);

    console.log("Created a new token with address:", address, "gas used:", createGasUsed.toString());
    instance = new ethers.Contract(address, interface, this.owner);
    expect(await instance.name()).to.equal("SomeName2"); //check name    
    await expect(instance.ownerOf(tokenID)).to.be.reverted; //there is no such token in the second contract
    await instance.connect(this.owner).safeMint(this.addr1.address, tokenID); //can mint
    expect(await instance.ownerOf(tokenID)).to.equal(this.addr1.address);
    expect(await instance.tokenURI(tokenID)).to.equal(tokenURI+tokenID.toString());
  });
});