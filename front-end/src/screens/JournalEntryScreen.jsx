import { useState } from "react"

export default function JournalEntryScreen() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
      };

    function updateContent() {
        // Send data to back end server
    }

    return (
        <>
            <div className="date"></div>
            
            <div className = "textBox">
                <input type="text" value={inputValue} onChange={handleChange} />
            </div>
            <div className="create" onClick={() => updateContent()}></div>
        </>
    )
}
