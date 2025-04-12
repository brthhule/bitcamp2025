// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import JournalEntryScreen from './screens/JournalEntryScreen';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen/>} />
      <Route path="/about" element={<About />} />
    </Routes>    
  )
}

export default App
