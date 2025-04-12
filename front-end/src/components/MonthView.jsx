import React from 'react'

import WeekRow from './WeekRow'
import WeekDays from './WeekDays'
import MonthLayoutData from './MonthLayoutData';
import "../styles/MonthView.css"


export default function Monthdiv () {
    function RowGap() {
        return <div className="rowGap"/>
    }

    function RenderWeekRow({weekNumber, weekDayNumbers, daysWithinMonth}) {
        return (
            <>
                <WeekRow 
                    weekDayNumbers={weekDayNumbers} 
                    daysWithinMonth={daysWithinMonth}
                />
                {weekNumber != 6 ? <RowGap/> : <></>}
            </>
        )
    }

    /**
     * Retrieve the model of events happening this month, week by week
     */
    MonthLayoutData.initializeWeeks();
    // console.log("MonthLayoutData weeks:")
    // console.log(MonthLayoutData.weeks)

    const weekNumbers = ['1', '2', '3', '4', '5', '6'];

    return(
        <div className="calendardiv">
            <div style={{height: "5px"}}/>
            <WeekDays/>
            <RowGap/>

            {weekNumbers.map((weekNumber) => 
                <>
                    <div style={{height: 10}}/>
                    <RenderWeekRow 
                        key = {weekNumber}
                        weekNumber={weekNumber}
                        weekDayNumbers={MonthLayoutData.weeks[weekNumber - 1]}
                        daysWithinMonth = {MonthLayoutData.daysWithinMonth[weekNumber - 1]}
                    />
                </>

            )}
        </div>
    )
}

