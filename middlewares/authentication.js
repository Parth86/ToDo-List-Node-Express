const jwt = require('jsonwebtoken');

const authentication = async function(req, res, next) {
    // console.log('token: ', req.body.headers)
    const authorization = req.headers.authorization || req.body.headers.authorization 
    if(!authorization || !authorization.startsWith('Bearer ')){
        res.json('no  authorization')
        return
    }
    const token = authorization.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)
        const {userId, name} = decoded
        req.body.user = userId
        next()
    } catch(err) {
        res.json(err)
    }
}
module.exports = authentication