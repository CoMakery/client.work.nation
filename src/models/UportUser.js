import { Connect } from 'uport-connect'
import { d } from 'lightsaber/lib/log'
import IPFS from 'ipfs-mini'
import Promise from 'bluebird'
import moment from 'moment'

import Auth from './Authentication'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const appName = 'Work.nation'
const clientId = '0x09f8cffb288b2dbb0db6050abb51f18d112798a4'
const connect = new Connect(appName, { clientId })
const web3 = connect.getWeb3()

const contractAddress = '0x8cb4cb36e7cc72bb84f48daed7cb8071c3f55f8f'
const contractAbi = [{"constant":false,"inputs":[{"name":"claim","type":"string"}],"name":"getSigner","outputs":[{"name":"_signer","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_claim","type":"string"}],"name":"put","outputs":[{"name":"_success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getClaim","outputs":[{"name":"_claim","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claimCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"claims","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"payable":false,"type":"fallback"}]  // eslint-disable-line
const claimContract = web3.eth.contract(contractAbi)
const claims = claimContract.at(contractAddress)

export default class UportUser {
  REPUTON_ASSERTION_CONFIRM = 'confirm'

  static login() {
    return connect.requestCredentials(
      // requested: ['name', 'phone', 'country'],
      // notifications: true
    )
    .then((credentials) => {
      Auth.setCurrentUser(credentials)
      return credentials
    }).catch(console.error)
  }

  static claimSkill(currentUser, skill) {
    let reputon = {
      'application': 'skills',
      'reputons': [
        {
          'rater': currentUser,
          'assertion': skill,
          'rated': currentUser,
          'rating': 1,  // maybe not in reputon
          'sample-size': 1,
          'generated': moment().unix(),  // seconds since 1970 (reputon standard)
          // reputon fields we are not using:
          // expires
          // confidence
          // normal-rating
        }
      ]
    }

    return this.addJSON(reputon, this.handleIpfsResult)
    .then((ipfsId) => {
      return this.contractClaim(ipfsId)
    })
  }

  static confirmSkill(currentUser, skillIpfsKey) {
    const reputon = {
      'application': 'skills',
      'reputons': [
        {
          'rater': currentUser,
          'assertion': this.REPUTON_ASSERTION_CONFIRM,
          'rated': skillIpfsKey,
          'rating': 0.5,
          'normal-rating': 0.5,
          'sample-size': 1,
          'generated': moment().unix(),  // seconds since 1970 (reputon standard)
        }
      ]
    }

    return this.addJSON(reputon, this.handleIpfsResult).then((ipfsId) => {
      return this.contractClaim(ipfsId)
    })
  }

  static addJSON(json) {
    return new Promise((resolve, reject) => {
      ipfs.addJSON(json, (error, result) => {
        if (error) {
          return reject(error)
        } else {
          console.log('https://ipfs.io/ipfs/' + result)
          return resolve(result)
        }
      })
    })
  }

  static handleIpfsResult(err, _result) {
    if (err) throw err
  }

  static contractClaim(ipfsId) {
    d('creating claim...')
    return new Promise((resolve, reject) => {
      claims.put(ipfsId, (error, txhash) => {
        if (error) {
          return reject(error)
        } else {
          console.log('https://ropsten.io/tx/' + txhash)
          return resolve(txhash)
        }
      })
    })
  }

  static isValidAddress(candidate) {
    return /(0x)?[0-9a-fA-F]{40}/.test(candidate)
  }
}
