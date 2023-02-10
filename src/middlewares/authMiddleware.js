function authMiddleware(req, res, next) {
    if (req.session.userLogged != undefined) {
        res.redirect('/users/profile');
    } else {
        next();
    }
}

module.exports = authMiddleware;