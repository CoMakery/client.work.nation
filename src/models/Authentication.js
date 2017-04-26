import { d } from 'lightsaber/lib/log'
import isBlank from 'is-blank'
import isPresent from 'is-present'

// Note that attempting to impersonate another uPort address
// will result in invalid reputons, which are ignored
export default class Authentication {
  SESSION_KEY = 'worknation_current_user_uport_address'

  static setCurrentUserHandler(setCurrentUser) {
    this.appSetCurrentUser = setCurrentUser
  }

  static getCurrentUserHandler(getCurrentUser) {
    this.appGetCurrentUser = getCurrentUser
  }

  static getUportAddress(props) {
    return this.getCurrentUser(props).uportAddress
  }

  static getCurrentUser(props = null) {
    if (props && props.currentUser) {
      return props.currentUser
    } else if (isPresent(this.appGetCurrentUser())) {  // normal app flow
      return this.appGetCurrentUser()
    } else if (isPresent(window.sessionStorage.getItem(this.SESSION_KEY))) {  // bootstrap on app start from browser session
      const uportAddress = window.sessionStorage.getItem(this.SESSION_KEY)
      return {uportAddress}
    } else {
      return null
    }
  }

  static setCurrentUser(currentUser) {
    currentUser.uportAddress = currentUser.uportAddress || currentUser.address
    delete currentUser.address
    this.appSetCurrentUser(currentUser)
    const {uportAddress} = currentUser
    window.sessionStorage.setItem(this.SESSION_KEY, uportAddress)
  }

  static logout() {
    this.appSetCurrentUser(null)
    window.sessionStorage.clear()
  }

  static redirectUnlessLoggedIn(props) {
    if (isBlank(props.currentUser)) props.history.push('/login')
  }
}
