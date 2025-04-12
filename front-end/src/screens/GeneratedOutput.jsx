import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const serverAddress = "http://localhost:3000"; // Make sure this matches your backend

function GeneratedOutput() {
    const { date } = useParams();
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJournalEntry = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${serverAddress}/api/journal/${date}`);
                if (response.data.exists) {
                    setEntry(response.data.entry);
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
        return <p>Loading journal entry...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>Day Page</h1>
            {date && <h3>Date: {date}</h3>}
            {entry ? (
                <div>
                    <h2>{entry.title || 'No Title'}</h2>
                    <p>{entry.description || 'No Description'}</p>
                    {/* Display image if you implement it */}
                </div>
            ) : (
                <p>No journal entry for this date.</p>
            )}
            <button onClick={() => navigate('/')}>Back to Calendar</button>
        </div>
    );
}

export default GeneratedOutput;