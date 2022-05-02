require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.5",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    coeptix: {
      url: "https://ethernode.coeptix.net"
    },
    hardhat: {
      // See its defaults
    }
},
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
};
