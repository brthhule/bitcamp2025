import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/journalentry.css";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";
import axios from 'axios';
import { Box, Typography, Button } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { formatDate } from "../util/utils";

const serverAddress = "http://localhost:3000"; // Ensure this matches your backend port

export default function JournalEntryScreen() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [monthIndex, setMonthIndex] = useState(0);
    const [date, setDate] = useState(0);
    const [year, setYear] = useState(0);
    const dateString = formatDate(localData.currentDate)

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

const handleSubmit = async (event) => {
    
    event.preventDefault();
    
    if (!description) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Remove the redundant check - we already know an entry doesn't exist
        // Just create the entry directly
       
        console.log("Description: ")
        console.log(description)
        
        const createResponse = await axios.post(`${serverAddress}/api/journal`, { 
            date: dateString, 
            description : description
        });
        console.log("Res:")
        console.log(createResponse)

        if (createResponse.status === 201) {
            console.log("Navigating to generated output screen")
            navigate('/generated-output');
            //alert("Going to generated-output")
        } else {
            alert('Failed to create journal entry.');
            console.error('Error creating journal entry:', createResponse);
        }
    } catch (error) {
        
        console.error('Error creating journal entry:', error);
        alert('An error occurred while creating the journal entry.');
    }
};

    async function checkEntry() {
        const checkState = await axios.post(`${serverAddress}/api/exists`, { 
            date: dateString
        });
        if (checkState.data.exists == true) {
            console.log("Navigating to generated-output")
            navigate(`/generated-output`);
        }
    }

    useEffect(() => {
        setMonthIndex(localData.currentDate.getMonth());
        setYear(localData.currentDate.getFullYear());
        setDate(localData.currentDate.getDate());

        checkEntry()
    }, []);

    function Header() {
        return (
            <div className="header">
                <Button onClick={() => navigate("/")}>
                    <img src="/cancel_icon.png" style={{ width: 50, flex: 1 }} alt="Cancel" />
                </Button>

                <div style={{ flex: 1, fontSize: "50px", textAlign: "center", fontFamily: "Bestigia", color: '#000000' }}>
                    today's musings
                </div>
                <div className="calendar-button-container"> {}
                    <CalendarTodayIcon style={{ fontSize: 80, color: 'black' }} />
                    <div className="calendar-overlay-text"> {}
                        <div>{convertMonthIndex(monthIndex).substring(0,3) + " " + date}</div>
                        <div>{year}</div>
                    </div>
            </div>
            </div>
        );
    }

    return (
        <div className="journalEntryContainer">
            <Header />

            <form onSubmit={handleSubmit}>

                <div className="text-input">
                    <textarea
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="paint a picture of your day..."
                    />
                </div>

                <div className="create-container">
                    <Button type="submit" sx={{ cursor: "pointer", color: '#F2F2F2' }}>
                        <div className="create">
                            Save Entry
                        </div>
                    </Button>
                </div>
            </form>
        </div>
    );
}
