import React from 'react'
import Day from './Day';

function WeekRow({weekDayNumbers, daysWithinMonth}) {
    console.log("Week row debug")
    console.log({ weekDayNumbers, daysWithinMonth });



    function ColumnGap() {
        return <div className="columnGap"/>
    }

    const days = [0, 1, 2, 3, 4, 5, 6];
    console.log("Week row debug")
    console.log({ weekDayNumbers, daysWithinMonth });

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
        <div className="container">
            {days.map((dayInTheWeek) => <RenderColumns key={dayInTheWeek} dayInTheWeek={dayInTheWeek}/>)}
        </div>
    )
}



export default WeekRow;