import Header from "./header.jsx";
import { useState, useEffect } from "react";
import Meal from "./Addmeal.jsx";

export function Ideas({ token, food, setFood, meals, setMeals, darkMode, setDarkMode, Username }) {
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Load meals from API on mount
    useEffect(() => {
        async function fetchMeals() {
            try {
                const response = await fetch("/api/meals", {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (!response.ok) throw new Error("Failed to fetch meals");
                const data = await response.json();
                setMeals(data);
            } catch {
                setError("Failed to load meals");
            } finally {
                setIsLoading(false);
            }
        }
        if (token) fetchMeals();
        else setIsLoading(false);
    }, [token]);

    async function deleteMeal(id) {
        try {
            await fetch(`/api/meals/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            setMeals(meals.filter(m => m._id !== id));
        } catch {
            setError("Failed to delete meal");
        }
    }

    async function saveMeal(newMeal) {
        try {
            const response = await fetch("/api/meals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newMeal)
            });
            if (!response.ok) throw new Error("Failed to save meal");
            const result = await response.json();
            setMeals(prev => [...prev, {
                _id: result.insertedId,
                name: newMeal.name,
                ingredients: newMeal.ingredients
            }]);
            setIsDisplayed(false);
        } catch {
            setError("Failed to save meal");
        }
    }

    async function addAllToGroceries(meal) {
    const newItems = meal.ingredients.filter(ingredient =>
        !food.some(f => f.name.toLowerCase() === ingredient.name.toLowerCase())
    );

    try {
        const savedItems = await Promise.all(newItems.map(async ingredient => {
            const response = await fetch("/api/pantry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: ingredient.name,
                    category: ingredient.type,
                    inStock: true
                })
            });
            const result = await response.json();
            return {
                _id: result.insertedId,
                name: ingredient.name,
                category: ingredient.type,
                inStock: true
            };
        }));
        setFood(prev => [...prev, ...savedItems]);
    } catch {
        setError("Failed to add ingredients to pantry");
    }
}

    return (
        <main>
            <Header name={`${Username}'s - Meal History`} darkMode={darkMode} setDarkMode={setDarkMode} Username={Username} />

            {isLoading && <p className="ml-30 mt-5 text-gray-500">Loading meals...</p>}
            {error && <p className="ml-30 mt-5 text-red-500" aria-live="polite">{error}</p>}

            <div>
                <button
                    className="p-2 mt-5 ml-30 rounded bg-amber-400 hover:bg-amber-600 hover:shadow-lg"
                    onClick={() => setIsDisplayed(true)}
                >
                    Add Meal
                </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ml-30 mt-10 mr-30 gap-3">
                {meals.map((meal, index) => (
                    <div key={index} className="border rounded-2xl p-5 mb-6 hover:shadow-2xl max-w-xs">
                        <div className="flex flex-row justify-evenly">
                            <div>
                                <button className="text-md font-bold bg-red-400 rounded-full w-8 h-8 hover:bg-red-500" onClick={() => deleteMeal(meal._id)}>
                                    X
                                </button>
                            </div>
                            <h2 className="text-xl font-bold mb-2">{meal.name}</h2>
                            <div>
                                <button className="text-md font-bold bg-sky-400 p-2 rounded-xl hover:bg-sky-500" onClick={() => addAllToGroceries(meal)}>
                                    Add
                                </button>
                            </div>
                        </div>
                        <ul className="list-disc ml-5">
                            {meal.ingredients.map((ingredient, i) => (
                                <li key={i}>{ingredient.name} ({ingredient.type})</li>
                            ))}
                        </ul>
                        <div className="graph flex justify-center mt-20">
                            <img className="rounded-2xl" src="pasta.jpeg" alt="Demo" />
                        </div>
                    </div>
                ))}
            </div>

            {isDisplayed && (
                <Meal
                    onClose={() => setIsDisplayed(false)}
                    onSave={saveMeal}
                    food={food}
                    setFood={setFood}
                    darkMode={darkMode}
                />
            )}
        </main>
    );
}

export default Ideas;
