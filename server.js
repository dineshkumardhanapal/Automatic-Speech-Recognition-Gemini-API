// server.js (Node.js/Express example)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // For loading environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Configure CORS for your frontend's origin in production
app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit based on audio file size

// Initialize GoogleGenerativeAI with your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/transcribe', async (req, res) => {
    try {
        const { audioData, mimeType } = req.body;

        if (!audioData || !mimeType) {
            return res.status(400).json({ error: 'Missing audio data or mime type.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent([
            { text: "Transcribe the following audio precisely." },
            { inlineData: { mimeType: mimeType, data: audioData } }
        ]);

        const response = await result.response;
        const text = response.text();

        res.json({ transcription: text });
    } catch (error) {
        console.error('Transcription error:', error);
        res.status(500).json({ error: 'Failed to transcribe audio.', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend proxy listening on port ${port}`);
});
