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
        <div className="container">
            <Header/>
            
            <div className = "text-input">
                <input type="text" value={inputValue} onChange={handleChange} />
            </div>

            <div className = "create-container">
                <div onClick={() => navigate("/output")} sx={{ cursor: "pointer"}}>
                    <div className="create" onClick={() => updateContent()}>
                        SAVE ENTRY
                    </div>
                </div>
            </div>

        </div>
    )
}
