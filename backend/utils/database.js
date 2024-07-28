const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.username}:${process.env.password}@cluster0.qjq2rxt.mongodb.net/todo-mern-app?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('Success: Connected to MongoDB');
  } catch (err) {
    console.log('Failure: Not connected to MongoDB');
    console.log(err);
    throw new Error();
  }
};

module.exports = connectDB;
