import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/journalentry.css";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";
import axios from 'axios';
import { Box, Typography, Button } from "@mui/material";

const serverAddress = "http://localhost:3000"; // Ensure this matches your backend port

export default function JournalEntryScreen() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [monthIndex, setMonthIndex] = useState(0);
    const [date, setDate] = useState(0);
    const [year, setYear] = useState(0);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Date is automatic
        if (!description) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.get(`${serverAddress}/api/journal/exists?date=${date}`);
            if (response.data.exists) {
                console.log("Journal entry already exists for this date.");
                alert('A journal entry already exists for this date.');
                return;
            }
            const createResponse = await axios.post(`${serverAddress}/api/journal`, { date, description });
            console.log("Response status:", createResponse.status);

            if (createResponse.status === 201) {
                navigate(`/generated-output/${date}`);
            } else {
                alert('Failed to create journal entry.');
                console.error('Error creating journal entry:', createResponse);
            }
        } catch (error) {
            alert('An error occurred while checking or creating the journal entry.');
            console.error('Error checking or creating journal entry:', error);
        }
    };

    useEffect(() => {
        setMonthIndex(localData.currentDate.getMonth());
        setYear(localData.currentDate.getFullYear());
        setDate(localData.currentDate.getDate());
    }, []);

    function Header() {
        return (
            <div className="header">
                <Button onClick={() => navigate("/")}>
                    <img src="/cancel_icon.png" style={{ width: 50, flex: 1 }} alt="Cancel" />
                </Button>

                <div style={{ flex: 1, fontSize: "50px", textAlign: "center" }}>
                    LOG YOUR DAY!
                </div>
                <div className="image-container">
                    <Button>
                        <img src="/calendar_icon.png" alt="Calendar" />
                        <div className="overlay-text" style={{ flex: 1, position: "relative", top: 0 }}>
                            <div>{convertMonthIndex(monthIndex) + " " + date + ", \n"}</div>
                            <div>{year}</div>
                        </div>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <Header />

            <form onSubmit={handleSubmit}>

                <div className="text-input">
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                    />
                </div>

                <div className="create-container">
                    <Button type="submit" sx={{ cursor: "pointer" }}>
                        <div className="create">
                            SAVE ENTRY
                        </div>
                    </Button>
                </div>
            </form>
        </div>
    );
}
