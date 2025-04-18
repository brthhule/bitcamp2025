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
    const navigate = useNavigate();

    // Format date for display (from YYYY-MM-DD to MM/DD/YYYY)
    const formatDisplayDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    };

    useEffect(() => {
        const fetchJournalEntry = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${serverAddress}/api/journal/${date}`);
                if (response.data.exists) {
                    setEntry(response.data.entry);
                    console.log("Sending over:")
                    console.log(response.data.entry.description)
                } else {
                    setError('No journal entry found for this date.');
                }
            } catch (error) {
                setError('Failed to fetch journal entry.');
                console.error('Error fetching journal entry:', error);
            } finally {
                setLoading(false);
            }
        };

        if (date) {
            fetchJournalEntry();
        }
    }, [date]);

    if (loading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Loading journal entry...</p>
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

            <div className="edit-container">
                <button className="edit-button" > {/*onClick={() => navigate(`/journal/${date}`)}*/}
                    Edit Entry
                </button>
            </div>
        </div>
    );
}

export default GeneratedOutput;