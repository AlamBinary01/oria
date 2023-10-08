const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');
const axios = require('axios');
router.use(express.json());
function getOpenAIResponse(prompt) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [path.join(__dirname, '../Bot/open.py')]);

    pythonProcess.on('error', (err) => {
      console.error('Error starting Python process:', err);
      reject('Error communicating with the Python script.');
    });

    let chatbotResponse = '';

    pythonProcess.stdout.on('data', (data) => {
      chatbotResponse += data.toString();
    });

    pythonProcess.stdout.on('end', () => {
      resolve(chatbotResponse);
    });
    pythonProcess.stdin.write(prompt + '\n');
    pythonProcess.stdin.end();
  });
}

// Handle POST requests to /oria
router.post('/oria', async (req, res) => {
  const userMessage = req.body.message; 

  try {
    const chatbotResponse = await getOpenAIResponse(userMessage);
    res.setHeader('Content-Type', 'application/json');
    res.json({ response: chatbotResponse });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;

