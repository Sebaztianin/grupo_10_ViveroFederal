// Middleware de aplicación que agrega a locals.userLogged, los datos del usuario logeado

function globalVariableMiddleware(req, res, next) {
    if (req.session.userLogged != undefined) {
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = globalVariableMiddleware;