const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("BinanceNFTUUPS Contract", function () {
    let BinanceNFT, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const BinanceNFTUUPS = await ethers.getContractFactory("BinanceNFTUUPS");
        BinanceNFT = await upgrades.deployProxy(BinanceNFTUUPS, [], { kind: "uups" });
    });

    it("Should initialize with correct name and symbol", async function () {
        expect(await BinanceNFT.name()).to.equal("BinanceNFTUUPS");
        expect(await BinanceNFT.symbol()).to.equal("BNFUP");
    });

    it("Should mint an NFT and assign it to the caller", async function () {
        await BinanceNFT.connect(addr1).mintNFT(); // addr1 mints an NFT
        const ownerOfToken = await BinanceNFT.ownerOf(0); // Verify owner of token ID 0
        expect(ownerOfToken).to.equal(addr1.address);
    });

    it("Should list an NFT for sale", async function () {
        await BinanceNFT.connect(addr1).mintNFT(); // Mint NFT
        await BinanceNFT.connect(addr1).listNFTForSale(0, ethers.parseEther("1")); // List for sale

        const saleDetails = await BinanceNFT.getSaleDetails(0); // Fetch sale details
        expect(saleDetails.isForSale).to.be.true; // Assert sale status
        expect(saleDetails.price).to.equal(ethers.parseEther("1")); // Assert price
        expect(saleDetails.seller).to.equal(addr1.address); // Assert seller
    });

    it("Should allow another user to buy a listed NFT", async function () {
        await BinanceNFT.connect(addr1).mintNFT();
        await BinanceNFT.connect(addr1).listNFTForSale(0, ethers.parseEther("1"));

        await BinanceNFT.connect(addr2).buyNFT(0, {
            value: ethers.parseEther("1"),
        });

        const newOwner = await BinanceNFT.ownerOf(0);
        expect(newOwner).to.equal(addr2.address);

        const saleDetails = await BinanceNFT.getSaleDetails(0);
        expect(saleDetails.isForSale).to.be.false;
    });

    it("Should revert if a non-owner tries to list an NFT", async function () {
        await BinanceNFT.connect(addr1).mintNFT();

        await expect(
            BinanceNFT.connect(addr2).listNFTForSale(0, ethers.parseEther("1"))
        ).to.be.revertedWith("You are not the owner of this NFT");
    });

    it("Should delist an NFT for sale", async function () {
        await BinanceNFT.connect(addr1).mintNFT();
        await BinanceNFT.connect(addr1).listNFTForSale(0, ethers.parseEther("1"));

        await BinanceNFT.connect(addr1).delistNFT(0);

        const saleDetails = await BinanceNFT.getSaleDetails(0);
        expect(saleDetails.isForSale).to.be.false;
    });

    it("Should revert if the price is not greater than zero", async function () {
        await BinanceNFT.connect(addr1).mintNFT();
        await expect(
            BinanceNFT.connect(addr1).listNFTForSale(0, 0)
        ).to.be.revertedWith("Price must be greater than zero");
    });

    it("Should revert if incorrect value is sent to buy an NFT", async function () {
        await BinanceNFT.connect(addr1).mintNFT();
        await BinanceNFT.connect(addr1).listNFTForSale(0, ethers.parseEther("1"));

        await expect(
            BinanceNFT.connect(addr2).buyNFT(0, {
                value: ethers.parseEther("0.5"),
            })
        ).to.be.revertedWith("Incorrect value sent");
    });

    it("Should revert unauthorized upgrade attempts", async function () {
        const unauthorized = addr1; // Non-owner account

        await expect(
            upgrades.upgradeProxy(BinanceNFT.address, await ethers.getContractFactory("BinanceNFTUUPS"), {
                call: {
                    signer: unauthorized,
                    fn: "_authorizeUpgrade",
                    args: [BinanceNFT.address],
                },
            })
        ).to.be.revertedWith("Ownable: caller is not the owner");
    });
});
