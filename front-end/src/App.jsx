import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import JournalEntryScreen from './screens/JournalEntryScreen';
import GeneratedOutput from './screens/GeneratedOutput';

import './App.css';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
            Sentra
          </Typography>
        </Box>
      </Box>

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/journal" element={<JournalEntryScreen />} />
        <Route path="/output/:date" element={<GeneratedOutput />} />      </Routes>
    </Box>
  );
}

export default App;
