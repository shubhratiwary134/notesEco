
import { FaSearch } from "react-icons/fa";
export default function SearchBar({setSearchBarInput}){
   
    return (
        <>
            <div className="my-10 border-2  px-2 py-3 w-1/2 shadow-md bg-white flex gap-2 items-center">
                <FaSearch/>
                <input type="text" placeholder="search "   onChange={(e)=>{setSearchBarInput(e.target.value) 
                  }} className="w-full focus:outline-none placeholder:italic placeholder:font-bold placeholder:text-black"></input>
               
            </div>
        </>
    )
}