const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { assert, expect } = chai;

chai.use(solidity);

describe("MyContract", function () {
  let contract;
  beforeEach(async () => {
    const MyContract = await ethers.getContractFactory("MyContract");
    contract = await MyContract.deploy();
    await contract.deployed();
  });

  it("should initially have x set to 3", async function () {
    assert.equal(await contract.x(), 3);
  });

  it("should revert if a non-owner tries to set X", async () => {
    const signer = await ethers.provider.getSigner(1);
    await expect(contract.connect(signer).changeNumber(20)).to.be.reverted;

    assert.equal(await contract.x(), 3);
  });

  describe("modifying the variable as the owner", () => {
    beforeEach(async () => {
      const signer = await ethers.provider.getSigner(0);
      await contract.connect(signer).changeNumber(20);
    });

    it("should allow an owner to change the number to 20", async () => {
      assert.equal(await contract.x(), 20);
    });
  });

  describe("transferring ownership", () => {
    let nonOwnerSigner, nonOwnerAddress;
    beforeEach(async () => {
      nonOwnerSigner = await ethers.provider.getSigner(1);
      nonOwnerAddress = await nonOwnerSigner.getAddress();
      await contract.transferOwnership(nonOwnerAddress);
    });

    it("should allow us to change the number with signer 1", async () => {
      await contract.connect(nonOwnerSigner).changeNumber(42);
      assert.equal(await contract.x(), 42);
    });

    it("should revert if a non-owner tries to set X", async () => {
      const signer = await ethers.provider.getSigner(1);
      await expect(contract.changeNumber(20)).to.be.reverted;

      assert.equal(await contract.x(), 3);
    });
  });
});
