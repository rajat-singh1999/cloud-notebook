const connectToMongo = require('./dBase');
connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Api listening at http://localhost:${port}`)
})
