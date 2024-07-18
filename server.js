const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json()); // Middleware to parse JSON bodies

router.post('/api/receive', (req, res) => {  // Changed to '/receive' to match your URL
    const messageobj = req.body;

    console.log('Received message object:', messageobj);

    res.status(200).json({
        message: 'Message received successfully',
        data: messageobj
    });
});

app.use('/.netlify/functions/remoteServer', router);

module.exports.handler = serverless(app);
