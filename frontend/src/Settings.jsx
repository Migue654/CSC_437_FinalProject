
import Header from "./header";

export function Settings({darkMode, setDarkMode,Username}){
    return(
    <main className="flex flex-col justify-center ">
       <Header name="Settings" darkMode={darkMode} setDarkMode={setDarkMode} Username={Username}/>
        <div>

        </div>
        <div className="flex justify-center mt-10">
        <div className=" main flex flex-col gap-5">
            <div>
            <button className="button">settings</button>
            </div>

            <div>
            <button className="button">settings</button>
            </div>

            <div>
            <button className="button ">settings</button>
            </div>

            <div>
            <button className="button ">settings</button>
            </div>

            <div>
            <button className="button">settings</button>
            </div>

            <div>
            <button className="button ">settings</button>
            </div>


        </div>
        </div>
    </main>


);
}

export default Settings;
