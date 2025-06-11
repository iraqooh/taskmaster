const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer')) {
        return res.sendStatus(401).json({ message: 'Missing or malformed token' });
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch {
        res.sendStatus(403)
    }
}