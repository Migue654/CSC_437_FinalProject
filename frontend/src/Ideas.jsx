import Header from "./header.jsx";
import { useState } from "react";
import Meal from "./Addmeal.jsx";

export function Ideas({ food, setFood,meals, setMeals, darkMode, setDarkMode, Username }) {

    const [isDisplayed, setIsDisplayed] = useState(false);


    function addAllToGroceries(meal) {
    meal.ingredients.forEach(ingredient => {
        const alreadyExists = food.some(
            f => f.name.toLowerCase() === ingredient.name.toLowerCase()
        );
        if (!alreadyExists) {
            setFood(prev => [...prev, {
                name: ingredient.name,
                category: ingredient.type,
                inStock: true
            }]);
        }
    });
}
    return (
        <main>
            <Header name={`${Username} - Meal History`} darkMode={darkMode} setDarkMode={setDarkMode} />

            <div>
                <button
                    className="p-2 mt-5 ml-30 rounded bg-amber-400 hover:bg-amber-600 hover:shadow-lg"
                    onClick={() => setIsDisplayed(true)}
                >
                    Add Meal
                </button>
            </div>

            {/* Display Saved Meals */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]  ml-30 mt-10 mr-30 gap-3  ">
                {/* Map Every entry for the list and the name too*/}
                {meals.map((meal, index) => (
                    <div
                        key={index}
                        className="  border rounded-2xl p-5 mb-6 hover:shadow-2xl max-w-xs"
                    >
                         <div className="flex flex-row justify-evenly">
                             <div>
                               <button className="text-md font-bold bg-red-400 rounded-full w-8 h-8 hover:bg-red-500" onClick={() => setMeals(meals.filter((_, i) => i !== index))}>
                                    X
                                </button>
                            </div>
                                <h2 className="text-xl font-bold mb-2">
                                    {meal.name}
                                </h2>
                            <div>
                                <button className="text-md font-bold bg-sky-400 p-2 rounded-xl hover:bg-sky-500"onClick={() => addAllToGroceries(meal)}>
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
                        <img className="rounded-2xl"src="pasta.jpeg" alt="Demo Graph" />
                        </div>
                    </div>
                ))}

                {/* Example Meal Card */}
                       <div className="  border rounded-2xl p-5 mb-6 hover:shadow-2xl max-w-xs">
                        <div className="flex flex-row justify-evenly">
                            <div>
                               <button className="text-md font-bold bg-red-400 rounded-full w-8 h-8 hover:bg-red-500" >
                                    X
                                </button>
                            </div>
                        <h2 className="text-xl font-bold mb-2">
                           Example Meal
                        </h2>
                        <div>
                            <button className="text-md font-bold bg-sky-400 p-2 rounded-xl hover:bg-sky-500 "> Add </button>
                        </div>
                        </div>

                        <ul className="list-disc ml-5">
                            <li>This one is Permenant as a Placeholder</li>
                           <li>Add- Adds Ingredients to Groceries</li>
                           <li>X - gets rid of card </li>


                        </ul>

                         <div className="graph flex justify-center mt-20">
                        <img className="rounded-2xl"src="pasta.jpeg" alt="Demo Graph" />
                        </div>
                    </div>
            </div>

            {/* Display Modal */}
            {isDisplayed && (
                <Meal
                    onClose={() => setIsDisplayed(false)}
                    onSave={(newMeal) => {
                    setMeals([...meals, newMeal]);
                    setIsDisplayed(false);
                    }}
                     food={food}
                    setFood={setFood}
                     darkMode={darkMode}

                />
            )}

        </main>
    );
}

export default Ideas;
