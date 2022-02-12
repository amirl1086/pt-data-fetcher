const mongoose = require("mongoose");
const config = require("config");

//mongoS
class Mongo {
  constructor() {
    mongoose.connection.on("error", (e) => {
      msg = `Error initializing mongo db, url: ${config.mongo.host}:${config.mongo.port}, DB name: ${config.mongo.dbName}\nError message: ${e.message}`;
      console.error(msg);
      throw new Error(msg);
    });

    await mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}
const initDB = async () => {

}

const find = async (filter) => {
    const result = await mongoose.find(filter);
    return result;
}

module.exports = {
    initDB
}