const mongoose = require('mongoose');
mongoose.set('strictQuery', false)

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('Server connected successfully in MongoDB Atlas')
        })
        .catch((err) => {
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection;