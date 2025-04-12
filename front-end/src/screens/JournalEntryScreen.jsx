import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import "../styles/journalentry.css"
import { useEffect } from "react";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";
import axios from 'axios';

const serverAddress = "http://localhost:5173"; // Make sure this matches your backend



export default function JournalEntryScreen() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [monthIndex, setMonthIndex] = useState(0);
    const [date, setDate] = useState(0)
    const [year, setYear] = useState(0);



    const handleChange = (e) => {
        setDescription(e.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Date is automatic
        if (!title || !description) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post(`${serverAddress}/api/journal/exists`, { date, title, description });
            console.log("Response status:")
            console.log(response.status)
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
    

    useEffect(() => {
        setMonthIndex(localData.currentDate.getMonth());
        setYear(localData.currentDate.getFullYear());
        setDate(localData.currentDate.getDate());
      }, []);

    function Header() {
        return (
            <div className="header">
                <div onClick={() => navigate("/")}>
                    <img src="/cancel_icon.png" style={{width: 50, flex: 1}}/>
                </div>
                <div style={{flex: 1, fontSize: "50px", textAlign: "center",   fontFamily: "bestigia"}}>
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
        <div className="journal-container">
            <Header/>
            
            <div className = "text-input">
                <input type="text" value={description} onChange={handleChange} />
            </div>

            <div className = "create-container">
                <div onClick={() => navigate("/output")} sx={{ cursor: "pointer"}}>
                    <div className="create" onClick={() => handleSubmit()}>
                        Save Entry
                    </div>
                </div>
            </div>

        </div>
    )
}