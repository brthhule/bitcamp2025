import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Typography } from '@mui/material' // import MUI components

function App() {
  const [count, setCount] = useState(0)

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
