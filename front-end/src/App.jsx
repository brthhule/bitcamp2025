// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import JournalEntryScreen from './screens/JournalEntryScreen';
import './App.css'
import { Box, Typography } from '@mui/material' // import MUI components

function App() {
  return (
    <>
      <Box>
        <Box sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', 
                     justifyContent: 'space-between', 
                     alignItems: 'center', 
                     mb: 2 }}>
            <Typography variant= "h1" sx={{ fontWeight: 'bold' }}>
              Sentra
            </Typography>
          </Box>
        </Box>

        {/* Calendar */}
        

        <button>
          Click Me
        </button>

      </Box>
    </>
  )
}

export default App
