(async () => {
  console.log('##########################################################################')
  console.log('## GSN relay funding                                                    ##')
  console.log('##########################################################################')

  // IMPORT
  require('dotenv').config()
  const HDWalletProvider = require('@truffle/hdwallet-provider')
  const Web3 = require('web3')
  const request = require('request-promise')
  const irelayhub = require( '../../gsn/build/contracts/IRelayHub.json')

  async function fundrelay(hubaddr, relayaddr, fromaddr, fund, stake, unstakeDelay, web3) {
      let rhub = new web3.eth.Contract(irelayhub.abi, hubaddr)
      let curstake = (await rhub.methods.getRelay(relayaddr).call()).totalStake;

      if ( curstake > 1e18 ) {
          console.log( "already has a stake of "+(curstake/1e18)+" eth. NOT adding more")
      } else {
          console.log( "staking ",stake)
          console.log( await rhub.methods.stake(relayaddr, unstakeDelay).send({value: stake, from:fromaddr, gas:8000000}))
      }

      let balance = await web3.eth.getBalance(relayaddr)
      if ( balance > 1e17 ) {
          console.log( "already has a balance of "+(stake/1e18)+" eth. NOT adding more")
      } else {
          ret = await new Promise((resolve,reject)=> {
              web3.eth.sendTransaction({from: fromaddr, to: relayaddr,value:fund, gas: 1e6}, (e, r) => {
                  if (e) reject(e)
                  else resolve(r)
              })
          })
          console.log(ret)
      }

  }

  async function run() {
      let hubaddr =process.env.RELAY_HUB
      let relay = process.env.RELAY_URL

      console.log({relay, hubaddr})
      if (relay.indexOf("http") == 0) {
          res = await request({
              uri: relay+"/getaddr",
              json: true
          })
          relay = res.RelayServerAddress
      }

      if (!relay) {
          console.log("usage: fundrelay.js {hubaddr} {relayaddr/url} {from-account}")
          console.log("stake amount is fixed on 1 eth, delay 30 seconds")
          process.exit(1)
      }

      // INIT
      console.log('Connecting to network ' + process.env.NODE_URL)
      let provider = new HDWalletProvider(process.env.MNEMONIC, process.env.NODE_URL)
      const web3 = new Web3(provider)
      const accounts = await web3.eth.getAccounts()

      // RUN
      await fundrelay(hubaddr, relay, accounts[0], 1.1e18, 1.1e18, 3600 * 24 * 7, web3)


      // END...
      provider.engine.stop();
      console.log('END!')
  }

  await run()
})();
