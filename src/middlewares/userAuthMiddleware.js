// Middleware para validar que el usuario logeado es el que quiero editar, sino redirecciono a su propia edición

function userAuthMiddleware(req, res, next) {
    if (req.session.userLogged != undefined) {
        if (req.session.userLogged.id == req.params.id) {
            next();
        } else {
            res.redirect('/users/editProfile/' + req.session.userLogged.id);
        }
    } else  {
        res.redirect('/users/login/');
    }
}

module.exports = userAuthMiddleware;