import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from './page/Dashboard'
import Monitoring from './page/Monitoring'
import SignUp from "./page/SignUp";
import LearnMore from "./page/LearnMorePage";
import Navbar from "./components/Navbar";
import './App.css'

// const api_url = "https://aqmonitoring.pythonanywhere.com"
const api_url = "https://stale-newt-84.telebit.io"

function App() {

  return (
    <Router className="bg-[url('/path-to-image.jpg')] bg-cover bg-center h-screen">
      <div className="fixed z-[-100] top-0 left-0 w-full h-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/bg.png')" }}></div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard api_url={api_url} />} />
        <Route path="/info" element={<Monitoring api_url={api_url} />} />
        <Route path="/signup" element={<SignUp api_url={api_url} />} />
        <Route path="/learnmore" element={<LearnMore api_url={api_url} />} />
      </Routes>
    </Router>
  )
}

export default App
