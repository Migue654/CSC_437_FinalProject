
import { useState } from "react";
import Header from "./header";

export function Supply({ food, setFood, darkMode, setDarkMode }){


        const [newFood,setNewfood]= useState("");
        const [newcategory,setCategory]= useState("");

        function addFood(){
            if(newFood=="") return;

            setFood([...food,{name:newFood,category:newcategory,inStock:true}]);

            setNewfood("");
            setCategory("");
        }


        function update(){
            setFood(food.filter(item=> item.inStock));
        }
        return (
        <div className="">
            <Header name="Groceries" darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="mt-10">
                <hr className="mt-5 mb-5"/>
                <p className="ml-5"> Hi <b>Miguel</b> here are some Groceries that you may Consider looking out for!!</p>
                <hr className="mt-5 mb-5"/>
            </div>

            {/* Add Food Section */}
            <div className="ml-6 flex flex-row flex-wrap gap-y-9">
                <button onClick={addFood} className="bg-blue-400 w-12 h-12  rounded-full hover:bg-blue-600 "> + </button>

                <label className="search ml-5">Add Groceries
                    <input value={newFood} name="search" onChange={(e)=>setNewfood(e.target.value)} className=" border p-1 rounded-xl ml-1"/>
                </label>

                {/* Category Selection */}
                <div className="ml-5 flex flex-row gap-5">

                  <label>Protein<input type="radio" value="Protein" checked={newcategory==="Protein"} onChange={(e)=>setCategory(e.target.value)} className=" border p-1 rounded-xl ml-1"/></label>
                  <label>Dairy<input type="radio" value="Dairy" checked={newcategory==="Dairy"} onChange={(e)=>setCategory(e.target.value)} className=" border p-1 rounded-xl ml-1"/></label>
                  <label>Vegetables<input type="radio" value="Vegetables"  checked={newcategory==="Vegetables"} onChange={(e)=>setCategory(e.target.value)} className="border p-1 rounded-xl ml-1"/></label>
                  <label>Carbs<input type="radio" value="Carbs" checked={newcategory==="Carbs"} onChange={(e)=>setCategory(e.target.value)}className=" border p-1 rounded-xl ml-1"/></label>


                </div>

                <div>
                <button onClick={update}className="ml-10 bg-amber-400 p-1 pl-4 pr-5 text-lg rounded hover:bg-amber-500"> Update </button>
                </div>

            </div>
            {/* Update Button*/}

            <div>


            {/* Food List Section */}
            <div className="main_content grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 m-10 mt-20 ">
                <div className="Section grocery_list">
                  <p className="section-header title">Protein</p>
                  <hr/>

                    {food.filter(item=> item.category === "Protein" || item.category ==="protein").map((item,index)=> (
                    <label key={index}>
                    <input type="checkbox" className=" m-1" checked={!item.inStock} onChange={() => {setFood(food.map(f =>f === item ? { ...f, inStock: !f.inStock } : f));}}/>
                    {item.name}
                  </label>))}




                </div>

                <div className="Section grocery_list">
                  <p className="section-header title">Dairy</p>
                  <hr/>
                  {food.filter(item=> item.category === "Dairy" || item.category ==="dairy").map((item,index)=> (
                    <label key={index}>
                    <input type="checkbox" className=" m-1" checked={!item.inStock} onChange={() => {setFood(food.map(f =>f === item ? { ...f, inStock: !f.inStock } : f));}}/>
                    {item.name}
                  </label>))}

                </div>

                <div className="Section grocery_list">
                  <p className="section-header title">Vegetables</p>
                  <hr/>
                  {food.filter(item=> item.category === "Vegetables" || item.category ==="vegetables").map((item,index)=> (
                    <label key={index}>
                    <input type="checkbox" className=" m-1" checked={!item.inStock} onChange={() => {setFood(food.map(f =>f === item ? { ...f, inStock: !f.inStock } : f));}}/>
                    {item.name}
                  </label>))}


                </div>

               <div className="Section grocery_list">
                  <p className="section-header title">Carbs</p>
                  <hr/>
                  {food.filter(item=> item.category === "Carbs" || item.category ==="carbs").map((item,index)=> (
                    <label key={index}>
                    <input type="checkbox" className="m-1 " checked={!item.inStock} onChange={() => {setFood(food.map(f =>f === item ? { ...f, inStock: !f.inStock } : f));}}/>
                    {item.name}
                  </label>))}


                </div>
              </div>



            </div>

        </div>
    );


}

export default Supply;
