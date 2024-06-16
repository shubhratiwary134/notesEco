import { useState } from "react"

export default function AddNotePage({handleStoringNote}){
    const [inputValue,setInputValue]=useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    return (
        <>
        <div className="flex flex-col  justify-around  items-center sticky bottom-2 p-5  opacity-75 bg-[#F7F8F9]  border-2 border-black min-h-56 rounded-xl m-5 lg:m-24  ">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Title " className="placeholder:italic placeholder:text-black   bg-[#F7F8F9]  w-full focus:outline-none hover:border-b-2 border-black p-2"></input>
        
            <textarea placeholder="Description" value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} className=" placeholder:italic placeholder:text-black   bg-[#F7F8F9]  w-full focus:outline-none  hover:border-b-2 border-black p-1 text-area-for-note"></textarea>
           
            <button onClick={()=>{handleStoringNote(inputValue,descriptionValue)
                setDescriptionValue('')
                setInputValue('')
            }} className="border-2 border-black text-sm  py-2 px-10 hover:scale-125 hover:duration-300">Add</button>
        </div>
        </>
    )
}