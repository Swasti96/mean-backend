const mongoose = require('mongoose');

exports.dbConnection = async () => {

    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        throw new Error('Cant connect to the DataBase');
    }

}


