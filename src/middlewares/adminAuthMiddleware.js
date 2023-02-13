function adminAuthMiddleware(req, res, next) {
    if (req.session.userLogged != undefined && req.session.userLogged.category == 'admin') {
        next();
    } else {
        res.redirect('/users/profile');
    }
}

module.exports = adminAuthMiddleware;