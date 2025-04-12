import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material"; 
import MonthDiv from "../components/MonthView";

export default function HomeScreen() {
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 2 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Sentra
                </Typography>
            </Box>

            {/* Calendar */}
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Calendar
                </Typography>
                <Typography variant="h7" sx={{ fontWeight: 'bold', mb: 2 }}>
                    April 2024
                </Typography>

                <MonthDiv/>

                <Box>
                    <Box>
                        Calendar
                    </Box>

                </Box>
                
            </Box>
           

            {/* Button Navigation */}
            <Box onClick={() => navigate("/journal")} sx={{ cursor: "pointer",  mb: 2 }}>
                <Button variant="contained">
                    Make
                </Button>
            </Box>
        </Box>
    );
}
