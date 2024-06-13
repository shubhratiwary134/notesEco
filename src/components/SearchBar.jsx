import { useState } from "react"

export default function SearchBar({setSearchBarInput}){
   
    return (
        <>
            <div className="my-10 border-2 px-2 py-3 w-1/2">
                <input type="text" placeholder="search "   onChange={(e)=>{setSearchBarInput(e.target.value) 
                  }} className="w-full focus:outline-none"></input>
               
            </div>
        </>
    )
}