const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const votes = db.collection('votes');
const users = db.collection('user');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});


function getUser(email) {
    return users.findOne({ email: email });
}
  
function getUserByToken(token) {
    return users.findOne({ token: token });
}
  
async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
      email: email,
      password: passwordHash,
      token: uuid.v4(),
    };
    await users.insertOne(user);
  
    return user;
  }
  




async function setVotes(source){
    const original = votes.find().toArray();
    let red = source.red;
    let blue = source.blue;
    votes.updateOne({name: "Master"}, { $inc: {red: red, blue: blue}});
    //const updates = votes.insertOne(source);
    return updates;
}

function getVotes() {
  const updates = votes.find().toArray();
  return updates;
}

module.exports = { getUser, getUserByToken, createUser, setVotes, getVotes };
