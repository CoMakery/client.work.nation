export default class Nav {
  static redirectUnlessLoggedIn(currentUser) {
    if (!currentUser) {
      this.props.history.push('/login')
    }
  }
}

