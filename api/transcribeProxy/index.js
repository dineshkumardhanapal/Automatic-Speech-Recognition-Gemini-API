const fetch = require('node-fetch');

/**
 * This function acts as a secure proxy to the Google Gemini API.
 * It retrieves the API key from the secure server environment variables,
 * forwards the request with the audio data to the Gemini API,
 * and then returns the response to the front-end.
 */
module.exports = async function (context, req) {
    // Log for debugging purposes in Azure.
    context.log('Secure proxy function was triggered.');

    // 1. Get the secret Gemini API key from the Function's application settings.
    // This is the secure way to store secrets, they are never exposed to the client.
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // If the key hasn't been set in the Azure Portal, return an error.
    if (!GEMINI_API_KEY) {
        context.res = {
            status: 500,
            body: { error: "API key is not configured on the server. Please add GEMINI_API_KEY to the application settings." }
        };
        return;
    }
   
    // 2. Build the official Gemini API URL to call.
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        // 3. Forward the exact request body received from the front-end to the real Gemini API.
        const geminiResponse = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body) // Pass along the payload with audio data.
        });
       
        // Get the JSON response from the Gemini API.
        const geminiData = await geminiResponse.json();

        // 4. Return the entire response from Gemini back to our front-end.
        // This includes the transcription data or any errors from Google's side.
        context.res = {
            status: geminiResponse.status,
            headers: { 'Content-Type': 'application/json' },
            body: geminiData
        };

    } catch (error) {
        // If there's a network error or other issue, return a generic server error.
        context.res = {
            status: 500,
            body: { error: "Failed to call the Gemini API.", details: error.message }
        };
    }
};
