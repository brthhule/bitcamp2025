import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import JournalEntryScreen from './screens/JournalEntryScreen';
import GeneratedOutput from './screens/GeneratedOutput';
import './App.css';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/journal" element={<JournalEntryScreen />} />
        <Route path="/output" element={<GeneratedOutput />} />

      </Routes>
    </Box>
  );
}

export default App;
