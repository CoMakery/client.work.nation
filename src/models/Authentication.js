import { d } from 'lightsaber/lib/log'
import isBlank from 'is-blank'

export default class Authentication {
  SESSION_KEY = 'worknation_current_user_uport_address'  // Note that attempting to impersonate another uPort address will result in invalid reputons, which are ignored

// should only be called once, at app start, to initiate state
  static getCurrentUser() {
    return window.sessionStorage.getItem(this.SESSION_KEY)
  }

  static setCurrentUserHandler(setCurrentUser) {
    this.appSetCurrentUser = setCurrentUser
  }
  static setCurrentUser(uportAddress) {
    this.appSetCurrentUser(uportAddress)
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
