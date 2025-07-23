Provoice - Turn Your Audio into Text 🎤📄
Provoice is a sleek, responsive web application that leverages the Google Gemini API for accurate and efficient Automatic Speech Recognition (ASR). It provides a user-friendly interface for uploading audio files and receiving high-quality text transcriptions, designed with privacy and simplicity in mind.

✨ Features
Effortless Audio Uploads: Easily upload audio files via drag-and-drop or a file browser.

Real-time Transcription: Powered by the advanced Google Gemini API for fast and precise speech-to-text conversion.

Clean and Responsive UI: Built with Tailwind CSS for a modern and adaptable design across various devices.

Instant Copy & Download: Copy the transcribed text to your clipboard or download it as a .txt file with a single click.

Privacy-Focused: Assurances that no audio files or data are saved on the server.

🚀 Getting Started
Follow these steps to set up and run Provoice locally.

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
