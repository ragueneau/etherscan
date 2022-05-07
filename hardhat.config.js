require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:7545"
    },
    coeptix: {
      url: "https://ethernode.coeptix.net"
    },
    hardhat: {
      // See its defaults
    }
},
  paths: {
    artifacts: "./backend/artifacts",
    sources: "./backend/contracts",
    cache: "./backend/cache",
    tests: "./backend/test"
  },
};
