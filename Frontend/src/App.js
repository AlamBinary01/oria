import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import Chatbot from './pages/Bot';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="RegisterPage" element={<RegisterPage />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="chatbot" element={<Chatbot />} />


          </Routes>
        </Router>

    </>
  );
}

export default App;
