import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const serverAddress = "http://localhost:5173"; // Make sure this matches your backend

function JournalEntryScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedDateFromCalendar = location.state?.selectedDate;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(selectedDateFromCalendar || ''); // Initialize with selected date

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!date || !title || !description) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post(`${serverAddress}/api/journal`, { date, title, description });

            if (response.status === 201) {
                // Successfully created, now navigate to the GeneratedOutput for this date
                navigate(`/generated-output/${response.data.entry.date}`);
            } else {
                alert('Failed to create journal entry.');
                console.error('Error creating journal entry:', response);
            }
        } catch (error) {
            alert('An error occurred while creating the journal entry.');
            console.error('Error creating journal entry:', error);
        }
    };

    function Header() {
        return (
            <div className="header">
                <div onClick={() => navigate("/")}>
                    <img src="/cancel_icon.png" style={{width: 50, flex: 1}}/>
                </div>
                <div style={{flex: 1, fontSize: "50px", textAlign: "center"}}>
                    LOG YOUR DAY!
                </div>
                <div className="image-container">
                    <img src="/calendar_icon.png"/>
                    <div className="overlay-text" style={{flex: 1, position: "relative", top: 0}}>
                        <div>{convertMonthIndex(monthIndex) + " " + date + ", \n"}</div>
                        <div>{year}</div>
                    </div>

                </div>

            </div>
        )
    }

    return (
        <div>
            <h1>Create New Journal Entry</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="text"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        readOnly // You might want to make this editable or use a date picker
                    />
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
}

export default JournalEntryScreen;