module.exports = {
  networks: {
    coeptix: {
      host: "192.168.2.125",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
