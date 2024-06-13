import { useState } from "react"

export default function AddNotePage({handleStoringNote}){
    const [inputValue,setInputValue]=useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    return (
        <>
        <div className="flex flex-col sticky bottom-0.5 z-10 justify-around  items-center p-5 bg-white border-2 border-black  min-h-56 rounded-xl m-5 lg:m-24 ">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Enter the title " className=" w-full focus:outline-none hover:border-b-2 border-black p-2"></input>
        
            <textarea placeholder="Enter the description"  value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} className=" w-full focus:outline-none  hover:border-b-2 border-black p-1 text-area-for-note"></textarea>
            <button onClick={()=>handleStoringNote(inputValue,descriptionValue)} className="border-2 border-black text-sm  py-2 w-1/2 md:w-1/4 k">Add</button>
        </div>
        </>
    )
}