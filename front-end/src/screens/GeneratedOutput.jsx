import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/generatedoutput.css";

const serverAddress = "http://localhost:3000"; // Make sure this matches your backend

function GeneratedOutput() {
    const { date } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sentimentChartUrl, setSentimentChartUrl] = useState(null);
    const navigate = useNavigate();

    // Format date for display (from<ctrl3348>-MM-DD to MM/DD/YYYY)
    const formatDisplayDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    };

    useEffect(() => {
        const fetchJournalEntryAndSentimentChart = async () => {
            setLoading(true);
            setError(null);
            setEntry(null);
            setSentimentChartUrl(null);

            try {
                const journalResponse = await axios.get(`${serverAddress}/api/journal/${date}`);
                if (journalResponse.data.exists && journalResponse.data.entry) {
                    setEntry(journalResponse.data.entry);
                    console.log("Sending over for analysis:", journalResponse.data.entry.description);

                    // Call the /analyze endpoint to get the sentiment chart
                    const analyzeResponse = await axios.post(`${serverAddress}/analyze`, {
                        text: journalResponse.data.entry.description,
                        date: date,
                    }, {
                        responseType: 'blob' // Expecting an image blob
                    });

                    // Create a URL for the blob to display in an <img> tag
                    const imageUrl = URL.createObjectURL(analyzeResponse.data);
                    setSentimentChartUrl(imageUrl);

                } else {
                    setError('No journal entry found for this date.');
                }
            } catch (error) {
                setError('Failed to fetch journal entry and sentiment chart.');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (date) {
            fetchJournalEntryAndSentimentChart();
        }
    }, [date]);

    useEffect(() => {
        // Clean up the object URL when the component unmounts
        return () => {
            if (sentimentChartUrl) {
                URL.revokeObjectURL(sentimentChartUrl);
            }
        };
    }, [sentimentChartUrl]);

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading journal entry and analyzing sentiment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-text">Error: {error}</p>
                <button className="back" onClick={() => navigate('/')}>Back to Calendar</button>
            </div>
        );
    }

    return (
        <div className="generated-output-container">
            <div className="banner-container">
                <button className="back-button" onClick={() => navigate('/')}>
                    <img src="/arrow-image.svg" alt="Back" className="back-arrow" />
                </button>
                <div className="date-banner">
                    {formatDisplayDate(date)}
                </div>
                <div className="expand-button">
                    <img src="/expand-icon.png" alt="Expand" className="expand-icon" />
                </div>
            </div>

            <div className="entry-header">
                <h1 className="entry-title">Entry</h1>
                <div className="audio-icon">
                    <img src="/audio-icon.svg" alt="Audio" />
                </div>
            </div>

            <div className="entry-content">
                {entry ? (
                    <p className="entry-description">{entry.description || 'No Description'}</p>
                ) : (
                    <p className="no-entry">No journal entry for this date.</p>
                )}
            </div>

            {sentimentChartUrl && (
                <div className="sentiment-chart-container">
                    <h2>Sentiment Analysis</h2>
                    <img src={sentimentChartUrl} alt="Daily Sentiment Pie Chart" className="sentiment-chart" />
                </div>
            )}

            <div className="edit-container">
                <button className="edit-button" > {/*onClick={() => navigate(`/journal/${date}`)}*/}
                    Edit Entry
                </button>
            </div>
        </div>
    );
}

export default GeneratedOutput;