import React from 'react'
import Day from './Day';
import "../styles/WeekRow.css"

function WeekRow({weekDayNumbers, daysWithinMonth}) {



    function ColumnGap() {
        return <div className="columnGap"/>
    }

    const days = [0, 1, 2, 3, 4, 5, 6];

    function RenderColumns({dayInTheWeek}) {
        return (
            <>
            
                <Day 
                    dayInTheWeek={dayInTheWeek} 
                    weekDayNumbers={weekDayNumbers}
                    daysWithinMonth={daysWithinMonth}
                />
                {dayInTheWeek != 6 ? <ColumnGap/> : <></>}
            </>
        )
    }

    return (
        <div className="container" style={{flexDirection: "row"}}>
            {days.map((dayInTheWeek) => <RenderColumns key={dayInTheWeek} dayInTheWeek={dayInTheWeek}/>)}
        </div>
    )
}



export default WeekRow;