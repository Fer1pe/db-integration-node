const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ mensagem: 'Não autenticado!' });
        }

        // aceita "Bearer <token>" ou apenas token
        let token = authHeader;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }

        const decodedToken = jwt.verify(token, utils.JWT_KEY);
        req.userData = { id: decodedToken.id, email: decodedToken.email };
        next();
    } catch (error) {
        console.log('checkAuth error:', error);
        res.status(401).json({ mensagem: 'Não autenticado!' });
    }
}