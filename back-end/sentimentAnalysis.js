const axios = require('axios');
const { createCanvas } = require('canvas');
const fs = require('fs');

// Configure the Gemini API (using environment variable for security)
const API_KEY = process.env.GEMINI_API_KEY;
const model = 'gemini-1.5-pro-latest';

// Function to analyze sentiment using the Gemini API
async function analyzeSentiment(text) {
    const prompt = `Analyze the sentiment of the following text and provide a score (as a percentage between 0% and 100%) for each of the following emotions: excited, bored, happy, sad, angry, and fearful. Return the scores in a clear format. Text: '${text}'`;

    try {
        const response = await axios.post('https://generative-api.google.com/v1/generate', {
            prompt: prompt,
            model: model,
            api_key: API_KEY,
        });

        const sentimentText = response.data.text.trim();
        console.log(`Raw Sentiment Output: ${sentimentText}`);

        const scores = {};
        const emotionMap = {
            excited: /excited:\s*(\d+)%/,
            bored: /bored:\s*(\d+)%/,
            happy: /happy:\s*(\d+)%/,
            sad: /sad:\s*(\d+)%/,
            angry: /angry:\s*(\d+)%/,
            fearful: /fearful:\s*(\d+)%/,
        };

        Object.keys(emotionMap).forEach(emotion => {
            const match = sentimentText.match(emotionMap[emotion]);
            if (match) {
                scores[emotion] = parseInt(match[1]) / 100.0;
            } else {
                scores[emotion] = 0.0;
            }
        });

        return scores;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

// Function to generate an image with colored squares representing sentiment scores
function generateImage(score, filename = 'colored_squares.png') {
    const colorMapping = {
        excited: '#FFB292',
        bored: '#CAB19C',
        happy: '#FFFFA9',
        sad: '#C7EBFF',
        angry: '#FF7B7B',
        fearful: '#DDBFFF',
    };

    const width = 100;
    const height = 100;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const totalSquares = 100;
    let filledSquares = 0;

    Object.keys(score).forEach(emotion => {
        const color = colorMapping[emotion];
        if (color) {
            const numSquares = Math.round(score[emotion] * totalSquares);

            for (let i = 0; i < numSquares; i++) {
                if (filledSquares < totalSquares) {
                    const row = Math.floor(filledSquares / 10);
                    const col = filledSquares % 10;

                    const x0 = col * 10;
                    const y0 = row * 10;
                    const x1 = x0 + 10;
                    const y1 = y0 + 10;

                    ctx.fillStyle = color;
                    ctx.fillRect(x0, y0, 10, 10);
                    filledSquares++;
                }
            }
        }
    });

    const out = fs.createWriteStream(filename);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    out.on('finish', () => {
        console.log(`Image saved as ${filename}`);
    });
}

// Example usage:
async function main() {
    const textToAnalyze = "I like don't have anything to do today. Like there's nothing that really interests me and I'm just tired really.!";
    const sentimentScores = await analyzeSentiment(textToAnalyze);

    console.log(`Text: '${textToAnalyze}'`);
    console.log(`Sentiment Scores: ${JSON.stringify(sentimentScores, null, 2)}`);

    const filename = `image_${new Date().toISOString().slice(0, 10)}.png`;
    generateImage(sentimentScores, filename);
}

main();
