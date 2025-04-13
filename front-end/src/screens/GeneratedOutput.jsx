import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/generatedoutput.css";
import { serverAddress, formatDate } from '../util/utils';
import LocalData from "../components/LocalData"

function GeneratedOutput() {
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sentimentChartUrl, setSentimentChartUrl] = useState(null);
    const navigate = useNavigate();


    function SentimentAnalysis() {
        if (sentimentChartUrl) {
            return (
                <div className="sentiment-chart-container">
                    <h2>Sentiment Analysis</h2>
                    <img src={sentimentChartUrl} alt="Daily Sentiment Pie Chart" className="sentiment-chart" />
                </div>
            )
        }
        return (
            <div>
                <h1>Unable to retrieve sentiment analysis data</h1>
            </div>
        )
    }

   

    useEffect(() => {
        const fetchJournalEntryAndSentimentChart = async () => {
            try {
                let currentDateFormatted = formatDate(LocalData.currentDate);
                const checkEntryExists = await axios.post(`${serverAddress}/api/exists`, { date: currentDateFormatted });
                
                if (checkEntryExists.data.exists) {
                    const serverEntry = await axios.post(`${serverAddress}/api/getEntry`, { date: currentDateFormatted });
                    const fetchedDescription = serverEntry.data.entry.description;
    
                    setEntry(fetchedDescription);
    
                    /*const analyzeResponse = await axios.post(`${serverAddress}/api/getEntry`, { text: entry, date: currentDateFormatted })
                    const imageUrl = URL.createObjectURL(analyzeResponse.data);
                    setSentimentChartUrl(imageUrl);
                    */
                   
    
                } else {
                    console.error("Entry does not exist");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch journal entry and sentiment chart.');
            } finally {
                setLoading(false);
            }
        };
    
        setLoading(true);
        setError(null);
        setEntry(null);
        setSentimentChartUrl(null);
        fetchJournalEntryAndSentimentChart();
    
    }, []); 
    


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
                    {formatDate(LocalData.currentDate)}
                </div>
                <div className="expand-button">
                    <img src="/expand-icon.png" alt="Expand" className="expand-icon" />
                </div>
            </div>

            <div className="entry-header">
                <h1 className="entry-title">Entry</h1>
                <div className="audio-icon">
                    <img src="/audio-icon.png" alt="Audio" />
                </div>
            </div>

            <div className="entry-content">
                {entry ? (
                    <p className="entry-description">{entry || 'No Description'}</p>
                ) : (
                    <p className="no-entry">No journal entry for this date.</p>
                )}
            </div>

            <SentimentAnalysis/>
            
            <img src="/pie-chart.png" style={{width: "500px"}}></img>

            <div className="edit-container">
                <button className="edit-button" > {/*onClick={() => navigate(`/journal/${date}`)}*/}
                    Edit Entry
                </button>
            </div>
        </div>
    );
}

export default GeneratedOutput;