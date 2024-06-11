require('dotenv').config();
const express = require('express');
const connectDb = require('./db/connect');
const app = express();
const port = 3000;
const router = require('./routes/index');

const projectsCollection = require('./db/projects-db');

app.use(express.json());

app.get('/', async (req, res) => {
  const projects = await projectsCollection(req.app.locals.db);
  const result = await projects.find().toArray();
  res.send('projects is ====================>' + JSON.stringify(result));
});

app.use('/api/v1', router);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  try {
    const client = await connectDb(process.env.MONGO_URI);
    const db = client.db('cart-calculation');
    app.locals.db = db; // Store the database connection in app locals
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error occurred while connecting to the database:', error);
  }
});
