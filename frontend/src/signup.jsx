import Header from "./header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";


export function Signup({ isRegistering, setToken, setUsername, darkMode, setDarkMode, Username }) {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit() {
        setError("");
        setIsLoading(true);

        const url = isRegistering ? "/api/auth/register" : "/api/auth/login";
        const body = isRegistering
            ? { username: usernameInput, email: emailInput, password: passwordInput }
            : { username: usernameInput, password: passwordInput };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.status === 409) {
                setError("Username already taken");
                return;
            }
            if (response.status === 401) {
                setError("Invalid username or password");
                return;
            }
            if (!response.ok) {
                setError("Something went wrong, please try again");
                return;
            }

            const data = await response.json();
            setToken(data.token);
            setUsername(data.username);
            navigate("/");
        } catch  {
            setError("Network error, please try again");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className={darkMode ? "bg-gray-900 text-white min-h-screen" : "min-h-screen"}>
            <Header name={isRegistering ? "Register" : "Login"} darkMode={darkMode} setDarkMode={setDarkMode} />

            <div className="flex flex-col items-center justify-center mt-20">
                <h2 className="text-2xl font-bold mb-4">
                    {isRegistering ? "Create an Account" : Username ? `Currently Loggin in as : ${Username}` : "Not Logged In Please Sign In"}
                </h2>

                <div className="flex flex-col w-full max-w-sm gap-3">
                    <input
                        type="text"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        placeholder="Username"
                        disabled={isLoading}
                        className="border p-2 rounded"
                    />

                    {isRegistering && (
                        <input
                            type="text"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="Email"
                            disabled={isLoading}
                            className="border p-2 rounded"
                        />
                    )}

                    <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Password"
                        disabled={isLoading}
                        className="border p-2 rounded"
                    />
                </div>

                {error && (
                    <p aria-live="polite" className="text-red-500 mt-3">{error}</p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-sky-400 px-4 w-full max-w-sm h-12 rounded hover:bg-sky-700 mt-4 disabled:opacity-50"
                >
                    {isLoading ? "Please wait..." : isRegistering ? "Register" : "Login"}
                </button>

               <p className="mt-4 text-sm">
                        {isRegistering
                            ? <span>Already have an account? <Link to="/login" className="text-sky-500 underline">Login here</Link></span>
                            : <span>Don't have an account? <Link to="/register" className="text-sky-500 underline">Register here</Link></span>
                        }
                </p>
            </div>
        </main>
    );
}

export default Signup;
