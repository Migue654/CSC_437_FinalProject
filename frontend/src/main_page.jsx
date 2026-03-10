// src/main_page.jsx

import Header from "./header";

export function MainPage({ meals = [] , darkMode, setDarkMode }) {

  return (
    <main>
       <Header name="Welcome to Meal-A-Maker" darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex justify-center mt-12 text-lg ">
        <p className="text-[clamp(0.1rem,1rem,5rem)] ">
          A website where you can make creative meals while keeping track of what's in your fridge
        </p>


      </div>

      <div className="graph-wrapper">
        <div className="graph flex justify-center mt-30">
          <img src="/graphdemo.png" alt="Demo Graph" />
        </div>
      </div>

      {/* Lists */}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] justify-around mt-60 gap-5 m-5 ">
        <div className="meal_list mainpage_list">
          <h2 className="title">Recent Meals</h2>
           <ul className="list-disc list-inside ml-5">
                        {meals.length === 0
                            ? <li>No meals added yet</li>
                            : meals.map((meal, i) => <li key={i}>{meal.name}</li>)
                        }
                    </ul>
        </div>



        <div className="ideas mainpage_list">
          <h2 className="title">Amount of Ingredients :)</h2>
          <ul className="list-disc list-inside ml-5">
                        {meals.length === 0
                            ? <li>No meal ideas yet</li>
                            : meals.map((meal, i) => <li key={i}>{meal.name} — {meal.ingredients.length} ingredients</li>)
                        }
                    </ul>
        </div>
      </div>


    </main>


  );
}

export default MainPage;
