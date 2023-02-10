function guestMiddleware(req, res, next) {
    if (req.session.userLogged == undefined) {
        res.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = guestMiddleware;