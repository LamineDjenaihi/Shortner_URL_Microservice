const mongoose = require("mongoose");
const MONGO_URI  = process.env.MONGO_URI;
exports.connect = async () => {
    try{
        // Connecting to the database
        await mongoose.connect(MONGO_URI, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true
                            });
        console.log("Successfully connected to database");
    }catch(error) {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    }
}