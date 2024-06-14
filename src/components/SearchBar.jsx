
import { FaSearch } from "react-icons/fa";
import logo from '../assets/Illustration.gif'
export default function SearchBar({setSearchBarInput}){
   
    return (
        <>
        <div className="flex justify-between">
        <div className="w-1/5 ">
            <img src={logo} className="max-w-full"></img>
        </div>
            <div className="my-12 border-2  px-2  w-3/4 shadow-md bg-white flex gap-2 items-center">
                <FaSearch/>
                <input type="text" placeholder="search "   onChange={(e)=>{setSearchBarInput(e.target.value) 
                  }} className="w-full focus:outline-none placeholder:italic placeholder:font-bold placeholder:text-black"></input>
               
            </div>
        </div>
      
        </>
    )
}