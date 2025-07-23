Automatic-Speech-Recognition-Gemini-API - Turn Your Audio into Text 🎤📄

ASR Gemini is a sleek, responsive web application that leverages the Google Gemini API for accurate and efficient Automatic Speech Recognition (ASR). It provides a user-friendly interface for uploading audio files and receiving high-quality text transcriptions, designed with privacy and simplicity in mind.

✨ Features

Effortless Audio Uploads: Easily upload audio files via drag-and-drop or a file browser.
Real-time Transcription: Powered by the advanced Google Gemini API for fast and precise speech-to-text conversion.
Clean and Responsive UI: Built with Tailwind CSS for a modern and adaptable design across various devices.
Instant Copy & Download: Copy the transcribed text to your clipboard or download it as a .txt file with a single click.
Privacy-Focused: Assurances that no audio files or data are saved on the server.

🚀 Getting Started

Follow these steps to set up and run ASR locally.

Prerequisites

Before you begin, ensure you have the following:
A web browser (e.g., Chrome, Firefox, Edge).
A Google Cloud Project with the Gemini API enabled.
An API Key generated from your Google Cloud Project.

Installation

Clone the Repository:
Bash
git clone https://github.com/your-username/provoice.git
cd provoce

(Replace your-username with your actual GitHub username if you're forking, or clone directly from the source.)
Open index.html:
Simply open the index.html file in your preferred web browser. All the necessary CSS (via Tailwind CDN) and JavaScript are included directly in the HTML file.

API Key Configuration

The core functionality relies on the Google Gemini API. You must replace the placeholder API key with your actual key.
Obtain Your Gemini API Key:
If you don't have one, follow the official Google Cloud documentation to enable the Gemini API and create an API key.
Update index.html:
Locate the following line in the <script> section of index.html:
JavaScript
const apiKey = "Fill_your_apikey_here";

Replace "Fill_your_apikey_here" with your actual Google Gemini API key.
JavaScript
const apiKey = "YOUR_ACTUAL_GEMINI_API_KEY"; // Example: "AIzaSy_YOUR_SECRET_API_KEY_HERE"

⚠️ Important: Do not commit your API key directly into public repositories. See the "Safety Measures for API Key Hiding" section below for better practices.

🔒 Safety Measures for API Key Hiding

Exposing API keys in frontend code (even in a private repository) is generally not recommended for production applications. For this client-side-only application, direct embedding is shown for simplicity, but for real-world deployments, consider these alternatives:

1. Backend Proxy (Recommended for Production) 🔐

The most secure method is to route all API requests through a backend server you control.
Your frontend sends the audio data to your backend.
Your backend, holding the API key securely (e.g., in environment variables), makes the request to the Gemini API.
Your backend then sends the transcription result back to your frontend.
This way, your API key is never exposed to the client-side.
Example Backend Proxy (Node.js/Express):

JavaScript


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


Frontend JavaScript would then make a fetch request to /transcribe on your backend server.

2. Environment Variables (for Local Development/CI) 🏡

When working locally or in a CI/CD pipeline, use environment variables to store your API key.
Create a .env file in your project root (e.g., for a Node.js backend).
Add GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY to it.
Ensure .env is in your .gitignore file.
Access the key in your server-side code using process.env.GEMINI_API_KEY.

3. Client-Side Considerations (Less Secure, but relevant for this project) ⚠️

For purely client-side applications where a backend proxy isn't feasible, direct embedding is the only option if the API requires direct client calls. However, be aware of the risks:
API Key Exposure: Anyone can view your API key in the browser's source code or network requests.
Abuse Potential: If your key allows costly operations, it could be abused by malicious actors.
Rate Limits/Quotas: Shared API keys might hit usage limits faster.
For this specific Provoice frontend:
Since it's a static HTML file meant for simple demonstration, the API key is embedded. For any real deployment, a backend proxy is strongly advised to protect your key.

🛠️ Technologies Used

HTML5: Structure of the web page.
Tailwind CSS: Utility-first CSS framework for styling.
Font Awesome: Icons.
Google Gemini API: For Automatic Speech Recognition.
JavaScript (ES6+): Frontend logic and API interaction.

🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'feat: Add new feature').
Push to the branch (git push origin feature/your-feature-name).
