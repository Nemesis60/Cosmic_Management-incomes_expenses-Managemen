const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) {
            res.status(401).json({ message: "Incorrect Credentials" });
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            res.status(401).json({ message: "Incorrect Credentials" });
        }
        
        
        const userTokenInfo = {
            id: user._id,
            rol: user.rol,
            username: user.username,
            image: user.imagePath
        }
        const userToken = jwt.sign(
            userTokenInfo, process.env.JWT_SECRET_KEY,
            {
                expiresIn: 60 * 60 * 24 * 7
            }
        )

        res.cookie('myToken', userToken, {
            httpOnly: true, //accessible only by web server 
            secure: process.env.NODE_ENV === 'production', //https
            sameSite: 'none', //cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 10 //cookie expiry: set to match rT
        })
        
        res.send({ username: user.username, email: user.email, token: userToken})
        
    } catch (error) {
        console.log(`Ups login: ${error}`);
    }
}

const logout = async (req, res) => {
    try {
        // const cookies = req.cookies;
        // if (!cookies.jwt) return res.sendStatus(204);
        res.clearCookie('myToken', { httpOnly: true, sameSite: 'none',
        secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Cookie Cleared' });
    } catch (error) {
        console.log(`Ups logout: ${error}`);
    }
}

module.exports = {
    login,
    logout
}