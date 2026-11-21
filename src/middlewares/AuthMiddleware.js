const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({
            mensagem: 'Token não informado.'
        });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        return next();

    } catch (error) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado.'
        });
    }
};