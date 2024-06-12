import { useState } from "react"

export default function AddNotePage({handleStoringNote}){
    const [inputValue,setInputValue]=useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    return (
        <>
        <div className="flex flex-col justify-around p-5 bg-blue-400 max-w-56 min-h-72  m-10">
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="enter the title " className="bg-blue-400 "></input>
            <textarea placeholder="enter the description"  value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} className="bg-blue-400"></textarea>
            <button onClick={()=>handleStoringNote(inputValue,descriptionValue)} className="border-2  px-10 py-2  text-white">submit</button>
        </div>
        </>
    )
}