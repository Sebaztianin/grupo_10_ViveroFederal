// Middleware para validar que el usuario logeado es admin, sino redirecciono al perfil

function adminAuthMiddleware(req, res, next) {
    if (req.session.userLogged != undefined && req.session.userLogged.user_category_id == 1) {
        next();
    } else if (req.session.userLogged == undefined) {
        res.redirect('/users/login?warning=notAdmin');
    } else {
        res.redirect('/users/profile?warning=notAdmin');
    }
}

module.exports = adminAuthMiddleware;