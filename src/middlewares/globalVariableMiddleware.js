function globalVariableMiddleware(req, res, next) {
    if (req.session.userLogged != undefined) {
        res.locals.userLogged = req.session.userLogged;
    }
    next();
}

module.exports = globalVariableMiddleware;