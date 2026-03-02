import './App.css';


import { MainPage } from "./main_page";
import {Settings} from "./Settings";
import {Supply} from "./Supply";
import {Ideas} from "./Ideas";
import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Signup } from './signup';

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [food,setFood]=useState([]);
    const [meals, setMeals] = useState([]);

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    return (
    <div className={darkMode ? "dark bg-gray-900 min-h-screen text-white"  : "min-h-screen"}>
        <Routes>
            <Route path="/signup" element={<Signup Username={Username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            Password={Password}
            setPassword={setPassword}
            darkMode={darkMode}
            setDarkMode={setDarkMode}/>} />
            <Route path="/" element={<MainPage food={food} meals={meals} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/supply" element={<Supply food={food} setFood={setFood} darkMode={darkMode} setDarkMode={setDarkMode} />} />
            <Route path="/ideas" element={<Ideas Username={Username} food={food} setFood={setFood} meals={meals} setMeals={setMeals} darkMode={darkMode} setDarkMode={setDarkMode} />} />

        </Routes>
    </div>
);
}

export default App;
