const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const ConnectioString = require('./ConnectionString');

const app = express();
app.use(cors());

mongoose.connect(ConnectioString.uri);
mongoose.connection.once('open', () => console.log('DB Connectd'));

const Isuuses = require('./routes/api/Issues');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',Isuuses);

app.listen(port, () => console.log(`listening on port: ${port}`));
