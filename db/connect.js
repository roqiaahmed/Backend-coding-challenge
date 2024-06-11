const MongoClient = require('mongodb').MongoClient;

const connectDb = async (url) => {
  const client = await MongoClient.connect(url);
  return client;
};

module.exports = connectDb;
