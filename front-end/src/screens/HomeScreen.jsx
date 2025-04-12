import { Box, Typography, Button } from "@mui/material"; 
import MonthDiv from "../components/MonthView";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";
import { useState } from "react";
import { useEffect } from "react";

import "../styles/home-screen.css"
import '../styles/fonts.css';

export default function HomeScreen() {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);

    function updateLocDataMonth(newMonth) {
        localData.currentDate.setMonth(newMonth);
        setMonth(localData.currentDate.getMonth())
        setYear(localData.currentDate.getFullYear())
    }

    function resetDate() {
        localData.currentDate = new Date();
        setMonth(localData.currentDate.getMonth())
        setYear(localData.currentDate.getFullYear())
    }

    useEffect(() => {
        setMonth(localData.currentDate.getMonth())
        setYear(localData.currentDate.getFullYear())
      }, []);

    return (
        <div>
            {/* Header */}
            <div className="reset-date" onClick={() => resetDate()}>
                sentra
            </div>


            {/* Calendar */}
            <Box>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div className="prev-month" style={{flex: 1}} onClick={() => updateLocDataMonth(localData.currentDate.getMonth() - 1)}>
                        <img src="/arrow-image.svg" style={{width: 40, paddingTop: 5}}/>
                    </div>
                    <div className="monthDate">
                        {convertMonthIndex(month) + " " + year}
                    </div>
                    <div className="next-month" style={{flex: 1}} onClick={() => updateLocDataMonth(localData.currentDate.getMonth() + 1)}>
                        <img src="/arrow-image.svg" style={{width: 40, paddingTop: 5, transform: "scaleX(-1)"}}/>
                    </div>
                </div>
                
                <MonthDiv/>
            </Box>

        </div>
    );
}
