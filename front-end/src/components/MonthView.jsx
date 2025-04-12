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
        //console.log("Week number, weekDayNumbers, daysWithinMonth: ");
        //console.log(weekNumber);
        //console.log(weekDayNumbers);
        //console.log(daysWithinMonth);

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
    console.log("MonthLayoutData weeks:")
    console.log(MonthLayoutData.weeks)

    const weekNumbers = ['1', '2', '3', '4', '5', '6'];

    return(
        <div className="row">
            <div className="container">
                <div className="sideGap"/>
                <div className="calendardiv">
                    <WeekDays/>
                    <RowGap/>

                    {weekNumbers.map((weekNumber) => 
                        <RenderWeekRow 
                            key = {weekNumber}
                            weekNumber={weekNumber}
                            weekDayNumbers={MonthLayoutData.weeks[weekNumber - 1]}
                            daysWithinMonth = {MonthLayoutData.daysWithinMonth[weekNumber - 1]}
                        />
                    )}
                </div>
                <div className="sideGap"/>
            </div>
        </div>
    )
}

