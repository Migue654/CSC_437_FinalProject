import './App.css';
import { MainPage } from "./main_page";
import { Settings } from "./Settings";
import { Supply } from "./Supply";
import { Ideas } from "./Ideas";
import { Signup } from './signup';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [food, setFood] = useState([]);
    const [meals, setMeals] = useState([]);
    const [token, setToken] = useState("");
    const [Username, setUsername] = useState("");

    return (
        <div className={darkMode ? "dark bg-gray-900 min-h-screen text-white" : "min-h-screen"}>
            <Routes>
                <Route path="/login" element={<Signup Username={Username} isRegistering={false} setToken={setToken} setUsername={setUsername} darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/register" element={<Signup isRegistering={true} setToken={setToken} setUsername={setUsername} darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/" element={<MainPage Username={Username} food={food} meals={meals} darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/settings" element={<Settings Username={Username} darkMode={darkMode} setDarkMode={setDarkMode} />} />
                <Route path="/supply" element={<Supply Username={Username} token={token} food={food} setFood={setFood} darkMode={darkMode} setDarkMode={setDarkMode} />} /><Route path="/ideas" element={<Ideas token={token} Username={Username} food={food} setFood={setFood} meals={meals} setMeals={setMeals} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            </Routes>
        </div>
    );
}

export default App;
