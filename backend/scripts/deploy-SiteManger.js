const axios = require("axios");
//const Config = require("../../config.json");
//open file from app root
//const Config = require("../../../config");

const Config = {
  "node": "http://192.168.2.125:8545",
  "restAPI": "https://etherapi.coeptix.net",
  "restAPI2": "http://127.0.0.1:4321",
  "restAPIport": 4321,
  "ApiKeyToken": "bohx4Gaej6pheing1leiti9roo6eimae"
}

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Get the ContractFactories and Signers here.
    const Faucet = await ethers.getContractFactory("SiteManager");

    // deploy contracts
    const SiteManager = await Faucet.deploy();

    console.log("Deployed contracts:", SiteManager.address);

    // Save copies of each contracts abi and address to the frontend.
    saveFrontendFiles(SiteManager , "SiteManager");
    await pushAbiToEtherscan(SiteManager.address, "SiteManager");
}


function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const contractsDir = __dirname + "../../data";
    console.log('Saving file to: ', contractsDir)

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + `/${name}-address.json`,
        JSON.stringify({ address: contract.address }, undefined, 2)
    );

    const contractArtifact = artifacts.readArtifactSync(name);

    fs.writeFileSync(
        contractsDir + `/${name}.json`,
        JSON.stringify(contractArtifact, null, 2)
    );
}

//push abi to etherscan.coeptix.net with the axios API
async function pushAbiToEtherscan(address, name) {
    //get the chain id
    const chainId = await ethers.provider.getNetwork().then(function(network) {
      return network.chainId;
    });
    let contractArtifact = artifacts.readArtifactSync(name);

    contractArtifact.chainId = chainId;

    const url = Config.restAPI + "/api?module=contract&action=insertabi&chainid=" + chainId + "&address=" + address + "&apikey=" + Config.ApiKeyToken;


    await axios.post(url, contractArtifact).then(function(response) {
      console.log(name, "abi pushed to etherscan.coeptix.net", response.data.message);
      console.log("https://etherscan.coeptix.net/interface/" + address + "\n");
    }
    ).catch(function(error) {
      console.log('error',error);
    })

}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});