import { useState } from "react";


export function Meal({ onClose, onSave,  darkMode }) {

     const bg = darkMode ? "bg-gray-800 text-white" : "bg-white";
    const inputClass = darkMode ? "border-gray-600 bg-gray-700 text-white w-full p-2 rounded border" : "border w-full p-2 rounded";

    const [mealName, setMealName] = useState("");
    const [ingredientInput, setIngredientInput] = useState({name: "", type: ""});
    const [ingredients, setIngredients] = useState([]);


    function addIngredient() {
        if (ingredientInput.name.trim() === "") return;

        setIngredients([...ingredients, {name:ingredientInput.name, type:ingredientInput.type}]);
        setIngredientInput({ name: "", type: "" });
    }

    function handleSave() {
        if (mealName.trim() === "") return;

        onSave({
            name: mealName,
            ingredients: ingredients
        });

        onClose();
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className={`${bg} p-6 rounded-2xl shadow-2xl w-130`}>
                <h2 className="text-lg font-bold mb-4">Add New Meal</h2>

                {/* Meal Name */}
                <input
                    type="text"
                    placeholder="Meal name"
                    className={`${inputClass} mb-3`}
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                />

                {/* Ingredient Input */}
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        placeholder="Add ingredient"
                        className={inputClass}
                        value={ingredientInput.name}
                        onChange={(e) => setIngredientInput({ ...ingredientInput, name: e.target.value })}
                    />



                    <button
                        className="bg-blue-400 px-3 rounded hover:bg-blue-500"
                        onClick={addIngredient}
                    >
                        +
                    </button>
                </div>
                <p className="font-bold">Select at least one item to later save to Groceries</p>
                <div className="flex justify-evenly mb-5 mt-5">
                  <label>Protein<input type="radio" value="Protein" checked={ingredientInput.type=="Protein"} onChange={(e)=>setIngredientInput({...ingredientInput, type: e.target.value})} className=" border p-1 rounded-xl ml-1"/></label>
                  <label>Dairy<input type="radio" value="Dairy" checked={ingredientInput.type=="Dairy"}   onChange={(e)=>setIngredientInput({...ingredientInput, type: e.target.value})}className=" border p-1 rounded-xl ml-1"/></label>
                  <label>Vegetables<input type="radio" value="Vegetables"  checked={ingredientInput.type=="Vegetables"}  onChange={(e)=>setIngredientInput({...ingredientInput, type: e.target.value})} className="border p-1 rounded-xl ml-1"/></label>
                  <label>Carbs<input type="radio" value="Carbs" checked={ingredientInput.type=="Carbs"}  onChange={(e)=>setIngredientInput({...ingredientInput, type: e.target.value})} className=" border p-1 rounded-xl ml-1"/></label>
                </div>
                {/* Ingredient List Preview */}
                <p className="mb-1 ml-2">Preview of List</p>
                <hr className={darkMode ? "border-gray-600" : ""}/>



                <ul className="list-disc ml-5 mb-4">
                    {ingredients.map((item, index) => (

                        <li key={index}>{item.name} ({item.type})</li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className={`${darkMode ? "bg-gray-600 hover:bg-gray-700 text-white" : "bg-gray-300 hover:bg-gray-400"} px-3 py-1 rounded`} onClick={onClose}>
                        Cancel
                    </button>

                    <button
                        className="bg-green-400 px-3 py-1 rounded hover:bg-green-500"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Meal;
