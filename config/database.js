const mongoose = require('mongoose');

const connectDB = async () => {
  let mongoConnection =
    process.env.NODE_ENV === 'development'
      ? process.env.MONGO_URI_QA
      : process.env.MONGO_URI;

  try {
    const connection = await mongoose.connect(mongoConnection, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`Mongo DB connected ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
