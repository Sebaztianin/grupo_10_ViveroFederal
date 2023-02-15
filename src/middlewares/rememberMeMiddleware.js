// Si existe una cookie de usuario logeado, almacena los datos en session (para botón de recordarme)

function rememberMeMiddleware(req, res, next) {
    if (req.cookies.userLogged != undefined && req.session.userLogged == undefined) {
        req.session.userLogged = req.cookies.userLogged;
    }
    next();
}

module.exports = rememberMeMiddleware;