import { useState, useEffect } from "react";
import Header from "./header";

export function Supply({ token, Username, food, setFood, darkMode, setDarkMode }) {
    const [newFood, setNewfood] = useState("");
    const [newcategory, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Load pantry from API on mount
    useEffect(() => {
        async function fetchPantry() {
            try {
                const response = await fetch("/api/pantry", {
                    headers: { "Authorization": `Bearer ${token}` }
                });


                if (!response.ok) throw new Error("Failed to fetch pantry");
                const data = await response.json();
                 console.log("Pantry data:", data);
                setFood(data);
            } catch  {
                setError("Failed to load pantry");
            } finally {
                setIsLoading(false);
            }
        }
        if (token) fetchPantry();
        else setIsLoading(false);
    }, [token]);

   async function addFood() {
    if (newFood === "") return;
    try {
        const response = await fetch("/api/pantry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: newFood, category: newcategory, inStock: true })
        });
        if (!response.ok) throw new Error("Failed to add item");
        const result = await response.json();
        // Construct the item using the insertedId from the result
        setFood(prev => [...prev, {
            _id: result.insertedId,
            name: newFood,
            category: newcategory,
            inStock: true
        }]);
        setNewfood("");
        setCategory("");
    } catch {
        setError("Failed to add item");
    }
}

    async function toggleInStock(item) {
        try {
            await fetch(`/api/pantry/${item._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ inStock: !item.inStock })
            });
            setFood(food.map(f => f._id === item._id ? { ...f, inStock: !f.inStock } : f));
        } catch {
            setError("Failed to update item");
        }
    }

    async function update() {
    const itemsToDelete = food.filter(item => !item.inStock);

    try {
        await Promise.all(itemsToDelete.map(item =>
            fetch(`/api/pantry/${item._id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            })
        ));
        setFood(food.filter(item => item.inStock));
    } catch {
        setError("Failed to update pantry");
    }
}

    return (
        <div className="">
            <Header name="Groceries" Username={Username} darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="mt-10">
                <hr className="mt-5 mb-5" />
                <p className="ml-5">Hi <b>there</b> here are some Groceries that you may Consider looking out for!!</p>
                <hr className="mt-5 mb-5" />
            </div>

            {isLoading && <p className="ml-5 text-gray-500">Loading pantry...</p>}
            {error && <p className="ml-5 text-red-500" aria-live="polite">{error}</p>}

            {/* Add Food Section */}
            <div className="ml-6 flex flex-row flex-wrap gap-y-9">
                <button onClick={addFood} className="bg-blue-400 w-12 h-12 rounded-full hover:bg-blue-600">+</button>

                <label className="search ml-5">Add Groceries
                    <input value={newFood} name="search" onChange={(e) => setNewfood(e.target.value)} className="border p-1 rounded-xl ml-1" />
                </label>

                <div className="ml-5 flex flex-row gap-5">
                    <label>Protein<input type="radio" value="Protein" checked={newcategory === "Protein"} onChange={(e) => setCategory(e.target.value)} className="border p-1 rounded-xl ml-1" /></label>
                    <label>Dairy<input type="radio" value="Dairy" checked={newcategory === "Dairy"} onChange={(e) => setCategory(e.target.value)} className="border p-1 rounded-xl ml-1" /></label>
                    <label>Vegetables<input type="radio" value="Vegetables" checked={newcategory === "Vegetables"} onChange={(e) => setCategory(e.target.value)} className="border p-1 rounded-xl ml-1" /></label>
                    <label>Carbs<input type="radio" value="Carbs" checked={newcategory === "Carbs"} onChange={(e) => setCategory(e.target.value)} className="border p-1 rounded-xl ml-1" /></label>
                </div>

                <button onClick={update} className="ml-10 bg-amber-400 p-1 pl-4 pr-5 text-lg rounded hover:bg-amber-500">Update</button>
            </div>

            {/* Food List Section */}
            <div className="main_content grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 m-10 mt-20">
                <div className="Section grocery_list">
                    <p className="section-header title">Protein</p>
                    <hr />
                    {food.filter(item => item.category === "Protein" || item.category === "protein").map((item, index) => (
                        <label key={index}>
                            <input type="checkbox" className="m-1" checked={!item.inStock} onChange={() => toggleInStock(item)} />
                            {item.name}
                        </label>
                    ))}
                </div>

                <div className="Section grocery_list">
                    <p className="section-header title">Dairy</p>
                    <hr />
                    {food.filter(item => item.category === "Dairy" || item.category === "dairy").map((item, index) => (
                        <label key={index}>
                            <input type="checkbox" className="m-1" checked={!item.inStock} onChange={() => toggleInStock(item)} />
                            {item.name}
                        </label>
                    ))}
                </div>

                <div className="Section grocery_list">
                    <p className="section-header title">Vegetables</p>
                    <hr />
                    {food.filter(item => item.category === "Vegetables" || item.category === "vegetables").map((item, index) => (
                        <label key={index}>
                            <input type="checkbox" className="m-1" checked={!item.inStock} onChange={() => toggleInStock(item)} />
                            {item.name}
                        </label>
                    ))}
                </div>

                <div className="Section grocery_list">
                    <p className="section-header title">Carbs</p>
                    <hr />
                    {food.filter(item => item.category === "Carbs" || item.category === "carbs").map((item, index) => (
                        <label key={index}>
                            <input type="checkbox" className="m-1" checked={!item.inStock} onChange={() => toggleInStock(item)} />
                            {item.name}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
