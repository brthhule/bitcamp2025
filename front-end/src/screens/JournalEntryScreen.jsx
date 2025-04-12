import { useState } from "react"
import "../styles/journalentry.css"
import { getDate } from "../model";

export default function JournalEntryScreen() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    function updateContent() {
        console.log(inputValue)
    }

    return (
        <div className="container">
            <div className="date">{getDate()}</div>
            
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
