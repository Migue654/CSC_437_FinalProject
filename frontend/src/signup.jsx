

import Header from "./header";
import { useNavigate } from "react-router";


export function Signup({Username, setUsername,Password,Email,  setEmail,  setPassword,darkMode, setDarkMode}){



    const navigate = useNavigate();
    return (
        <main className={darkMode ? "bg-gray-900 text-white min-h-screen" : "min-h-screen"}>
            <Header name="Info" darkMode={darkMode} setDarkMode={setDarkMode}  />

           <div className="flex flex-col items-center justify-center mt-20">
                <h2 className="text-2xl font-bold mb-4">Your Information</h2>
                <div className="flex flex-col max-w-300 w-full">
                    <input type="text" value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username" className="border p-2 rounded mb-3" />

                    <input type="text" value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className="border p-2 rounded mb-3" />

                    <input type="text" value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" className="border p-2 rounded mb-3" />
                </div>
                <button className="bg-sky-400 px-4  max-w-200 w-full h-20 rounded hover:bg-sky-700"
                    onClick={()=> navigate("/")}> Submit
                </button>
            </div>

        </main>
    );

}
