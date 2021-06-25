function auth(req, res, next) {
    if (req.isAuthenticated())      //using passport this will tell us wheater a user is logged in or not
    {
        return next()
    }
    return res.redirect('/login')
}

module.exports = auth