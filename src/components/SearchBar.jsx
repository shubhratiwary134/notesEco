
import { FaSearch } from "react-icons/fa";
import logo from '../assets/Illustration.gif'
export default function SearchBar({setSearchBarInput}){
   
    return (
        <>
        <div className="flex justify-center lg:justify-start w-full ">
        <div className="w-1/6 hidden md:flex">
            <img src={logo} className="max-w-full"></img>
        </div>
            <div className="my-8 md:my-10 lg:my-12 xl:my-16  px-2 py-1 sm:p-2 bg-white  w-3/5   flex gap-2 items-center">
                <FaSearch/>
                <input type="text" placeholder="search "   onChange={(e)=>{setSearchBarInput(e.target.value) 
                  }} className="w-full focus:outline-none placeholder:italic placeholder:font-bold placeholder:text-black "></input>
               
            </div>
        </div>
      
        </>
    )
}