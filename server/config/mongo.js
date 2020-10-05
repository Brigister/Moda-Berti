const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@modabertidb.dt0yc.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
        const connection = await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true

        });
        console.log(`MongoDB connect: ${connection.connection.host}`);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

module.exports = connectDB;