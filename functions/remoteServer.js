const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const router = express.Router();

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// In-memory storage for messages
let receivedMessages = [];

// Clear messages on each new build
if (process.env.CLEAR_MESSAGES_ON_BUILD === 'true') {
    receivedMessages = [];
}

// Endpoint to receive messages
router.post('/api/receive', (req, res) => {
    const newMessage = req.body;
    receivedMessages.push(newMessage);

    console.log('Received message object:', newMessage);

    res.status(200).json({
        message: 'Message received successfully',
        data: newMessage
    });
});

// Endpoint to fetch messages
router.get('/api/messages', (req, res) => {
    res.status(200).json(receivedMessages);
});

// Serve the frontend
app.use('/', express.static(path.join(__dirname, '../public')));

app.use('/.netlify/functions/remoteServer', router);

module.exports.handler = serverless(app);
