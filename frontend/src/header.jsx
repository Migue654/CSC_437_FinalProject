
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
import { faSpoon } from '@fortawesome/free-solid-svg-icons';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser} from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom";

import { useState } from "react";

export function Header({name, darkMode, setDarkMode }){

   const [menuOpen, setMenuOpen] = useState(false);

return( <div className="relative flex items-center justify-between flex-wrap gap-3">

  <Link to="/settings" className='hidden sm:block'>
    <FontAwesomeIcon
      icon={faUserGear}
      className="text-[clamp(1.5rem,3vw,3rem)] hover:scale-110 transition"
    />
  </Link>

 <Link to="/" className="absolute left-1/2 -translate-x-1/2">
    <h1 className="hover:scale-110 text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-center whitespace-nowrap">
      {name}
    </h1>
  </Link>


  <div className="hidden sm:flex gap-4 text-[clamp(1.5rem,3vw,3rem)]  mr-4">
    <button onClick={() => setDarkMode(!darkMode)}className="text-md px-3  rounded-full  hover:scale-110 transition">
            {darkMode ? "☀️" : "🌙"}
  </button>
  <Link to = "/signup" className='hover:scale-110 transition'>
      <FontAwesomeIcon icon={faCircleUser} />
    </Link>
    <Link to="/supply">
      <FontAwesomeIcon
        icon={faAppleWhole}
        className="hover:scale-110 transition"
      />
    </Link>


    <Link to="/ideas">
      <FontAwesomeIcon
        icon={faSpoon}
        className="hover:scale-110 transition"
      />
    </Link>
  </div>
  <button className="sm:hidden ml-auto mr-4 text-2xl hover:scale-110 transition" onClick={()=>setMenuOpen(!menuOpen)}>
    ☰
  </button>
  {menuOpen && (
  <div className={`absolute top-full right-0 mt-2 shadow-lg rounded-xl p-4 flex flex-col gap-4 text-xl z-50 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
    <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition">
      <FontAwesomeIcon icon={faUserGear} /> Settings
    </Link>
    <Link to="/supply" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition">
      <FontAwesomeIcon icon={faAppleWhole} /> Supply
    </Link>
    <Link to="/ideas" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition">
      <FontAwesomeIcon icon={faSpoon} /> Ideas
    </Link>
    <Link to="/signup" nClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:scale-105 transition">
      <FontAwesomeIcon icon={faCircleUser} /> Account

    </Link>
    <button onClick={() => { setDarkMode(!darkMode); setMenuOpen(false); }} className="flex items-center gap-2 hover:scale-105 transition">
      {darkMode ? "☀️" : "🌙"} {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  </div>
)}
</div>);

}

export default Header;
