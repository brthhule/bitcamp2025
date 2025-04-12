import localData from "./LocalData";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const serverAddress = "http://localhost:5173";
import { formatDate } from "../util/utils";

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
    async function goToDayScren() {
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
            const response = await axios.get(`${serverAddress}/api/journal/exists/`,{formattedDate});
            const data = response.data;

            if (data.exists) {
                navigate('/output/');
            } else {
                navigate('/journal');
            }
        } catch (error) {
            console.error("Error checking journal entry:", error);
            /*navigate('/journal', { state: { selectedDate: formattedDate, error: "Could not check for existing entry." } });*/
        }
    
    }
    return (
        <div className="dayContainer" onClick={() => goToDayScren()}>
            <div className="dayTop">
                <div className="topText">{weekDayNumbers[dayInTheWeek]}</div>
            </div>
        </div>
    )
    
        
}



