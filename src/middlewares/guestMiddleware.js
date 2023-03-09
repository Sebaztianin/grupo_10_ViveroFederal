// Middleware para validar que el usuario está logeado, si no está logeado lo redirecciono al login

function guestMiddleware(req, res, next) {
    if (req.session.userLogged == undefined) {
        res.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = guestMiddleware;