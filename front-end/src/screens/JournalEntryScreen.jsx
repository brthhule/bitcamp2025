import { useState } from "react"
import "../styles/journalentry.css"
import { getDate } from "../model";
import { useEffect } from "react";

export default function JournalEntryScreen() {
    const [inputValue, setInputValue] = useState('');
    const [date, setDate] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    function updateContent() {
        console.log(inputValue)
    }

    useEffect(() => {
        getDate().then(date => {
          setDate(date); // for example
        });
      }, []);

    return (
        <div className="container">
            <div className="date">{date}</div>
            
            <div className = "text-input">
                <input type="text" value={inputValue} onChange={handleChange} />
            </div>
            <div className = "create-container">
                <div className="create" onClick={() => updateContent()}>
                    Create
                </div>
            </div>

        </div>
    )
}
