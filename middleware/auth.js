module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash(' warning_msg', 'Login First')
    res.redirect('/users/login')
  }
}