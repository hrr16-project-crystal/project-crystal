const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// app.use(express.static(`${__dirname}/../client/build`));
// const path = require('path');
// app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../client/build/index.html`)));

mongoose.connect('mongodb://localhost:auth/auth-server');

// Cors is a middleware that will handle CORS in the browser
app.use(cors());
// Middleware that parses incoming requests into JSON no matter the type of request
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
