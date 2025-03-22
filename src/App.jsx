import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './page/Dashboard'
import Monitoring from './page/Monitoring'
import SignUp from "./page/SignUp";
import './App.css'

const api_url = "https://aqmonitoring.pythonanywhere.com"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard api_url={api_url} />} />
        <Route path="/info" element={<Monitoring api_url={api_url} />} />
        <Route path="/signup" element={<SignUp api_url={api_url} />} />
      </Routes>
    </Router>
  )
}

export default App
