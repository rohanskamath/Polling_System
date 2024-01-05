import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

import LandingPage from './Components/LandingPage'
import PollStation from './Components/PollStation'
import PollTrends from './Components/PollTrends'

const App = () => {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<LandingPage />} />
          <Route path='/pollstation' element={<PollStation />} />
          <Route path='/polltrends' element={<PollTrends />} />

        </Routes>

      </BrowserRouter>

    </div>
  )
}

export default App