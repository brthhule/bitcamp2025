const axios = require('axios');
const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Configure the Gemini API (using environment variable for security)
const API_KEY = process.env.GEMINI_API_KEY;
const model = 'gemini-1.5-pro-latest';

let weeklyAverages = {};

async function analyzeSentiment(text) {
    const prompt = `Analyze the sentiment of the following text and provide a score for each of these emotions: excited, bored, happy, sad, angry, and fearful.

    Your response must include all these emotions with percentage values (0-100) that add up to exactly 100%.

    Format your response exactly like this:
    excited: X%
    bored: Y%
    happy: Z%
    sad: A%
    angry: B%
    fearful: C%

    Text: '${text}'`;

    try {
        const response = await axios.post('https://generative-api.google.com/v1/generate', {
            prompt: prompt,
            model: model,
            api_key: API_KEY,
        });

        const sentimentText = response.data.text;
        const scores = {
            excited: 0.0,
            bored: 0.0,
            happy: 0.0,
            sad: 0.0,
            angry: 0.0,
            fearful: 0.0,
        };

        const emotionKeys = Object.keys(scores);
        emotionKeys.forEach(emotion => {
            const regex = new RegExp(`${emotion}:\\s*(\\d+)%`);
            const match = sentimentText.match(regex);
            if (match) {
                scores[emotion] = parseInt(match[1]) / 100.0;
            }
        });

        // Validate that scores add up close to 1.0
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        if (total < 0.1) {
            return {
                happy: 0.2,
                sad: 0.2,
                angry: 0.15,
                fearful: 0.15,
                excited: 0.15,
                bored: 0.15,
            };
        }

        return scores;
    } catch (error) {
        console.error("Error during sentiment analysis:", error);
        return {
            happy: 0.2,
            sad: 0.2,
            angry: 0.15,
            fearful: 0.15,
            excited: 0.15,
            bored: 0.15,
        };
    }
}

function calculateWeeklyStatistics(dailyScores) {
    const weeklySums = {};
    dailyScores.forEach(dayScore => {
        for (const emotion in dayScore) {
            weeklySums[emotion] = (weeklySums[emotion] || 0) + dayScore[emotion];
        }
    });

    const numDays = dailyScores.length;
    if (numDays === 0) return [{}, null];

    const weeklyAverages = Object.fromEntries(
        Object.entries(weeklySums).map(([emotion, totalScore]) => [
            emotion,
            totalScore / numDays,
        ])
    );

    let dominantEmotion = null;
    let maxAvgScore = -1;
    for (const [emotion, avgScore] of Object.entries(weeklyAverages)) {
        if (avgScore > maxAvgScore) {
            maxAvgScore = avgScore;
            dominantEmotion = [emotion, avgScore];
        }
    }

    return [weeklyAverages, dominantEmotion];
}

function generateWeeklySummaryFormatted(dominantEmotion) {
    if (dominantEmotion && dominantEmotion[0]) {
        const emotionName = dominantEmotion[0].charAt(0).toUpperCase() + dominantEmotion[0].slice(1);
        const emotionScorePercentage = Math.round(dominantEmotion[1] * 100);
        return `Really ${emotionName}! (With an average ${dominantEmotion[0]} score of ${emotionScorePercentage}%).`;
    } else {
        return "No dominant emotion identified for the week.";
    }
}

function createWeeklyPieChart(weeklyAverages) {
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 400, height: 400 });
    
    const emotionColors = {
        happy: 'yellow',
        sad: 'blue',
        angry: 'red',
        fearful: 'gray',
        excited: 'orange',
        bored: 'lightgray',
    };

    const data = {
        labels: Object.keys(weeklyAverages),
        datasets: [{
            data: Object.values(weeklyAverages),
            backgroundColor: Object.keys(weeklyAverages).map(label => emotionColors[label.toLowerCase()] || 'lightcoral'),
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(1)}%`
                }
            }
        }
    };

    return chartJSNodeCanvas.renderToBuffer(data, options);
}

async function main() {
    const dailyData = [
        { excited: 0.7, bored: 0.1, happy: 0.8, sad: 0.2, angry: 0.05, fearful: 0.0 },
        { excited: 0.6, bored: 0.2, happy: 0.75, sad: 0.15, angry: 0.1, fearful: 0.05 },
        { excited: 0.85, bored: 0.05, happy: 0.9, sad: 0.05, angry: 0.0, fearful: 0.0 },
        { excited: 0.5, bored: 0.3, happy: 0.6, sad: 0.3, angry: 0.15, fearful: 0.1 },
        { excited: 0.75, bored: 0.15, happy: 0.8, sad: 0.2, angry: 0.0, fearful: 0.02 },
        { excited: 0.65, bored: 0.25, happy: 0.7, sad: 0.25, angry: 0.08, fearful: 0.03 },
        { excited: 0.8, bored: 0.1, happy: 0.88, sad: 0.12, angry: 0.02, fearful: 0.01 },
    ];

    const [weeklyAverages, dominantEmotion] = calculateWeeklyStatistics(dailyData);

    const weeklySummaryFormatted = generateWeeklySummaryFormatted(dominantEmotion);
    console.log(weeklySummaryFormatted);
    console.log();

    const weeklySummaryChart = await createWeeklyPieChart(weeklyAverages);
    fs.writeFileSync('weekly_emotion_distribution.png', weeklySummaryChart);
    console.log("Weekly emotion distribution chart saved as 'weekly_emotion_distribution.png'.");
}

main();
