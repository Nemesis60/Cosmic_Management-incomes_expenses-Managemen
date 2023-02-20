const jwt = require('jsonwebtoken');

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch (error) {
        return console.log(error)
    }
}

const authorization = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const decodedToken = await verifyToken(token)
        console.log(token)
        console.log(tokenData)

        if (decodedToken._id) {
            next()
        } else {
            res.status(409).send({ error: "Apologies" })
        }
    } catch (error) {
        res.status(409).send({ error: "Apologies there is an error: ", error })
    }
}

const rolAuth = (rol) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const decodedToken = await verifyToken(token);
        const user = await userModel.findById(decodedToken._id);

        if ([].concat(rol).includes(user.rol)) {
            next()
        } else {
            res.status(409).send({ error: "Apologies you haven't permissions" })
        }
    } catch (error) {
        console.log(error)
        res.status(409).send({ error: "Apologies you haven't permissions" })
    }
}

module.exports = {
    authorization,
    rolAuth
}