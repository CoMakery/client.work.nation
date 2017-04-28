import { Connect } from 'uport-connect'
import { d } from 'lightsaber/lib/log'
import { randomKey } from 'lightsaber/lib/key'
import { cloneDeep, merge } from 'lodash'
import IPFS from 'ipfs-mini'
import Promise from 'bluebird'
import moment from 'moment'
import canonicalJson from 'json-stable-stringify'

import Auth from './Authentication'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const appName = 'Work.nation'
const clientId = '0x09f8cffb288b2dbb0db6050abb51f18d112798a4'
const connect = new Connect(appName, { clientId })
const web3 = connect.getWeb3()

const contractAddress = '0x0ac188eb03917623292784dfc01e5e330e684fc4'
const contractAbi = [{"constant":false,"inputs":[{"name":"claim","type":"string"}],"name":"getSigner","outputs":[{"name":"_signer","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_claim","type":"string"}],"name":"put","outputs":[{"name":"_success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"getClaim","outputs":[{"name":"_claim","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_claim1","type":"string"},{"name":"_claim2","type":"string"}],"name":"put2","outputs":[{"name":"_success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"claimCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"claims","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"whoami","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"payable":false,"type":"fallback"}]  // eslint-disable-line
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

  static claimSkill(skill) {
    const currentUserUportAddress = Auth.getUportAddress()
    let reputon = {
      'application': 'skills',
      'reputons': [
        {
          'rater': currentUserUportAddress,
          'assertion': skill,
          'rated': currentUserUportAddress,
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
    return this.saveJsonToIpfs(reputon, this.handleIpfsResult)
    .then((ipfsId) => {
      return this.createEthereumClaim(ipfsId)
    })
  }

  static confirmSkill(skillIpfsKey) {
    const currentUserUportAddress = Auth.getUportAddress()
    const reputon = {
      'application': 'skills',
      'reputons': [
        {
          'rater': currentUserUportAddress,
          'assertion': this.REPUTON_ASSERTION_CONFIRM,
          'rated': skillIpfsKey,
          'rating': 0.5,
          'normal-rating': 0.5,
          'sample-size': 1,
          'generated': moment().unix(),  // seconds since 1970 (reputon standard)
        }
      ]
    }
    return this.saveJsonToIpfs(reputon, this.handleIpfsResult).then((ipfsId) => {
      return this.createEthereumClaim(ipfsId)
    })
  }

  static createProject(params) {
    let permanodeKey
    return this.createPermanode()
    .then((_permanodeKey) => {
      permanodeKey = _permanodeKey
      const profile = merge(cloneDeep(params), {
        type: 'project',
        permanodeId: `/ipfs/${permanodeKey}`,
        timestamp: moment().toISOString(),
      })
      return this.saveJsonToIpfs(profile)
    }).then((projectKey) => {
      d({permanodeKey, projectKey})
      return this.createEthereumClaim(permanodeKey, projectKey)
    }).then(() => {
      return permanodeKey
    })
  }

  static createPermanode() {
    const currentUserUportAddress = Auth.getUportAddress()
    return this.saveJsonToIpfs({
      type: 'permanode',
      creator: currentUserUportAddress,
      random: randomKey(),
      timestamp: moment().toISOString(),  // ISO 8601 UTC timestamp with milliseconds
    })
  }

  static saveJsonToIpfs(json) {
    return new Promise((resolve, reject) => {
      ipfs.add(canonicalJson(json), (error, result) => {
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

  static createEthereumClaim(...ipfsKeys) {
    d('creating claim...')
    return new Promise((resolve, reject) => {
      if (ipfsKeys.length === 1) {
        claims.put(...ipfsKeys, (error, txhash) => {
          if (error) {
            return reject(error)
          } else {
            console.log('https://ropsten.io/tx/' + txhash)
            return resolve(txhash)
          }
        })
      } else if (ipfsKeys.length === 2) {
        claims.put2(...ipfsKeys, (error, txhash) => {
          if (error) {
            return reject(error)
          } else {
            console.log('https://ropsten.io/tx/' + txhash)
            return resolve(txhash)
          }
        })
      } else {
        return reject('1 or 2 IPFS keys supported, got: ' + ipfsKeys)
      }
    })
  }

  // static isValidAddress(candidate) {
  //   return /(0x)?[0-9a-fA-F]{40}/.test(candidate)
  // }
}
