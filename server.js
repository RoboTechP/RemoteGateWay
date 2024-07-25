const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios"); // Importing axios
const app = express();
const router = express.Router();

app.use(bodyParser.json()); // Middleware to parse JSON bodies

let receivedMessages = []; // Array to store received messages

router.post('/api/receive', (req, res) => {
    const newMessage = req.body;
    receivedMessages.push(newMessage);
    sendMessageToTermux(newMessage)
    console.log('Received message object:', newMessage);

    res.status(200).json({
        message: 'Message received successfully',
        data: newMessage
    });
});

// Serve the homepage
router.get('/', (req, res) => {
    const messagesHtml = receivedMessages.map(msg => `<pre>${JSON.stringify(msg, null, 2)}</pre>`).join('');

    res.send(`
        <html>
            <head>
                <title>Received Messages on Remote </title>
            </head>
            <body>
                <h1>Received Messages</h1>
                <h2> Updated Code will be displayed here </h2>
                ${messagesHtml}
            </body>
        </html>
    `);
});


async function sendMessageToTermux(message) {
    try {
      const response = await axios.post('http://localhost:3000/receive-message', {
        message: message
      });
      console.log('Message sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }


app.use('/', router);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
