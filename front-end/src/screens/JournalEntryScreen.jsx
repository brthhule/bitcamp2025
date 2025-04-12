import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../styles/journalentry.css"
import { useEffect } from "react";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";

export default function JournalEntryScreen() {
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState('');
    const [monthIndex, setMonthIndex] = useState(0);
    const [date, setDate] = useState(0)
    const [year, setYear] = useState(0);

    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    function updateContent() {
        console.log(inputValue)
    }
    

    useEffect(() => {
        setMonthIndex(localData.currentDate.getMonth());
        setYear(localData.currentDate.getFullYear());
        setDate(localData.currentDate.getDate());
      }, []);

    return (
        <div className="container">
            <div className="date">{convertMonthIndex(monthIndex) + " " + date + ", " + year}</div>
            
            <div className = "text-input">
                <input type="text" value={inputValue} onChange={handleChange} />
            </div>
            <div className = "create-container">
            <div onClick={() => navigate("/output")} sx={{ cursor: "pointer",  mb: 2 }}>
                <div className="create" onClick={() => updateContent()}>
                    Create
                </div>
            </div>
            </div>

        </div>
    )
}
