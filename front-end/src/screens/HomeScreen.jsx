import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material"; 
import MonthDiv from "../components/MonthView";
import localData from "../components/LocalData";
import { convertMonthIndex } from "../util/utils";
import { useState } from "react";
import { useEffect } from "react";

import "../styles/home-screen.css"

export default function HomeScreen() {
    const navigate = useNavigate();
    const [month, setMonth] = useState("");
    const [year, setYear] = useState(0);

    function updateLocDataMonth(newMonth) {
        console.log("************************************")
        console.log("Clicked" + newMonth)
        localData.currentDate.setMonth(newMonth);
        console.log("New month: " + localData.currentDate.getMonth())
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
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>

                    <div style={{display: "flex", alignContent: "center"}}>
                        <div className="reset-date" onClick={() => resetDate()}>
                            sentra
                        </div>
                    </div>

                    
                </Typography>
            </Box>

            {/* Calendar */}
            <Box>


                <div style={{display: "flex", justifyContent: 'center'}}>
                    <div className="prev-month" onClick={() => updateLocDataMonth(localData.currentDate.getMonth() - 1)}>
                        <img src="/arrow-image.svg" style={{width: 20}}/>
                    </div>
                    <div style={{width: 20}}/>
                    <Typography variant="h7" sx={{ fontWeight: 'bold', color: '#000000', mb: 2, fontFamily: 'IBMPlexMono' }}>
                        {convertMonthIndex(month) + " " + year}
                    </Typography>
                    <div style={{width: 20}}/>
                    <div className="next-month" onClick={() => updateLocDataMonth(localData.currentDate.getMonth() + 1)}>
                        <img src="/arrow-image.svg" style={{width: 20, transform: "scaleX(-1)"}}/>
                    </div>
                </div>
                

                <MonthDiv/>


                
            </Box>
            <Box sx={{ p: 2, textAlign: 'center', color: '#777', fontFamily: 'IBMPlexMono', fontSize: '0.9em' }}>
                click on a day to add an entry
            </Box>
        </Box>
    );
}
