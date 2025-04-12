import localData from "./LocalData";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const serverAddress = "http://localhost:5173";

function Day({dayInTheWeek, weekDayNumbers, daysWithinMonth}) {
    console.log("Debug line:");
    console.log({ weekDayNumbers, daysWithinMonth, dayInTheWeek });

    const navigate = useNavigate();
    const currentDate= localData.currentDate;

    async function goToDayScren() {
        const day = weekDayNumbers[dayInTheWeek];
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day.toString().padStart(2, '0')}`;

        console.log("Clicked date:", formattedDate);

        try {
            const response = await axios.get(`${serverAddress}/api/journal/${formattedDate}`);
            const data = response.data;

            if (data.exists) {
                navigate(`/output/${formattedDate}`, { state: { entry: data.entry } });
            } else {
                navigate('/journal', { state: { selectedDate: formattedDate } });
            }
        } catch (error) {
            console.error("Error checking journal entry:", error);
            navigate('/journal', { state: { selectedDate: formattedDate, error: "Could not check for existing entry." } });
        }
    }

    return (
        <div className="dayContainer" onClick={goToDayScren}>
            <div className="dayTop">
                <div className="topText">{weekDayNumbers[dayInTheWeek]}</div>
            </div>
            <div className="bottomContainer">
                <div className="bottomText">{localData.getEventsNumber(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    weekDayNumbers[dayInTheWeek],
                    daysWithinMonth[dayInTheWeek]
                )}</div>
            </div>
        </div>
    );
}

export default Day;