import localData from "./LocalData";
import { useNavigate } from "react-router-dom";
/**
 * A component for rendering the different days in the events-calendar view
 * @param {number} dayInTheWeek - What day of the week it is, Mon/Tue/Wed, etc.
 * @param {any} navigation -  
 * @returns A component
 */
function Day({dayInTheWeek, weekDayNumbers, daysWithinMonth}) {
    console.log("Debug line:")
    console.log({ weekDayNumbers, daysWithinMonth, dayInTheWeek });

    const navigate = useNavigate();
    /**
     * Example: 10/4/24
     * date: 4
     * month: 10
     * year: 24,
     * day: Fri
     */
    console.log(weekDayNumbers)
    const date = weekDayNumbers[dayInTheWeek];
    // Is this day
    const isWithinMonth = daysWithinMonth[dayInTheWeek];
    const currentDate= localData.currentDate;
    const prevDate= localData.prevDate;

    const dayEventsNumber = localData.getEventsNumber(
        currentDate.getFullYear(), 
        currentDate.getMonth(),
        weekDayNumbers[dayInTheWeek],
        daysWithinMonth[dayInTheWeek])

    /**When the day button/box is clicked, reset date to previous one, navigate to Day screen */
    function goToDayScren() {
        console.log("Date clicked: " + date);
        prevDate.setMonth(currentDate.getMonth(), currentDate.getDate());
        
        let modifier = 0;
        if (!isWithinMonth) {
            modifier = (date < 15) ? 1 : -1;
        }
        currentDate.setMonth(currentDate.getMonth() + modifier, date)
        console.log("Current date: " + currentDate)
        localData.dayEventsNumber = dayEventsNumber;
        navigate('/journal')
    }

    return (
        <div className="dayContainer" onClick={() => goToDayScren()}>
            <div className="dayTop">
                <div className="topText">{weekDayNumbers[dayInTheWeek]}</div>
            </div>

            <div className="bottomContainer">
                <div className="bottomText">{dayEventsNumber}</div>
            </div>
            
        </div>
    )
}

export default Day;
