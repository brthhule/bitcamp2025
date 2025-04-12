import localData from "./LocalData";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const serverAddress = "http://localhost:3000";
import { formatDate } from "../util/utils";
import "../styles/Day.css"

export default function Day({dayInTheWeek, weekDayNumbers, daysWithinMonth}) {
     /**
         * Example: 10/4/24
         * date: 4
         * month: 10
         * year: 24,
         * day: Fri
         */
    const date = weekDayNumbers[dayInTheWeek];
    // Is this day
    const isWithinMonth = daysWithinMonth[dayInTheWeek];
    const navigate = useNavigate();
    const currentDate= localData.currentDate;
    const prevDate= localData.prevDate;

    const dayEventsNumber = localData.getEventsNumber(
        currentDate.getFullYear(), 
        currentDate.getMonth(),
        weekDayNumbers[dayInTheWeek],
        daysWithinMonth[dayInTheWeek])
    
    /**When the day button/box is clicked, reset date to previous one, navigate to Day screen */
        /**Modifier is needed when determining what a month is if a day is selected outside of the primary month
         * For example, if the Month being shown is April but the user picks May 1st, how does the computer know if the selected month is in April?
         * The isWithinMonth tells us if a particular day is in April or if it's in (March or May).
         * If a day is not within the primary month and it is less than 15, it's the month before the primary month
         * If a day is not within the primary month and it is more than 15, it's the month after the primary month
         */
        async function goToDayScreen() {
            prevDate.setMonth(currentDate.getMonth(), currentDate.getDate());
        
            let modifier = 0;
            if (!isWithinMonth) { 
                modifier = (date < 15) ? 1 : -1;
            }
            currentDate.setMonth(currentDate.getMonth() + modifier, date)
            console.log("Selected date: " + currentDate)
            localData.dayEventsNumber = dayEventsNumber;
        
            try {
                const formattedDate = formatDate(currentDate);
                // Check if entry exists
                const response = await axios.get(`${serverAddress}/api/journal/exists?date=${formattedDate}`);
                
                if (response.data.exists) {
                    // If entry exists, go directly to generated output
                    navigate(`/generated-output/${formattedDate}`);
                } else {
                    // If no entry exists, go to journal entry creation page
                    navigate('/journal');
                }
            } catch (error) {
                console.error("Error checking journal entry:", error);
                // If error occurs, default to journal entry screen
                navigate('/journal');
            }
        }

    function detDayDate() {
        let monthNumber = currentDate.getMonth();
        const date = weekDayNumbers[dayInTheWeek];
        monthNumber += 1;
        let modifier = 0;
        if (!isWithinMonth) { 
            modifier = (date < 15) ? 1 : -1;
            monthNumber += modifier;
        }
        return monthNumber + "/" + date;
    }

    return (
        <div className="dayContainer" onClick={() => goToDayScreen()}>
            <div className="dayTop" style={{backgroundColor: isWithinMonth? "#a9a488" : "#c9c5b1"}}>
                <div className="topText">{detDayDate()}</div>
            </div>
        </div>
    )
    
        
}



