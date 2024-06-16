import { useState } from "react"
import { motion, useAnimate } from "framer-motion"

export default function AddNotePage({handleStoringNote,wrongInput,setWrongInput}){
    const [inputValue,setInputValue]=useState('')
    const [descriptionValue,setDescriptionValue]=useState('')
    const [scope,animate]=useAnimate()
    
   
    async function errorAnimation(){
        await animate(scope.current,{opacity:1},{duration:.5})
        await animate(scope.current,{x:[-10,10,-10,10,-10,0]},{duration:1});
        await animate(scope.current,{opacity:0},{duration:2})
        setWrongInput(false)
    }
    return (
        <>
        
        <motion.div
        whileHover={{opacity:1}}
        className= {`w-5/6 flex flex-col  justify-around  items-center   opacity-75 bg-[#F7F8F9]  border-2 border-black  rounded-xl  p-10 ` }>
            <input type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder="Title " className="placeholder:italic placeholder:text-black  placeholder:text-2xl  bg-[#F7F8F9]  w-full focus:outline-none hover:border-b-2 hover:duration-100 border-black p-2 mb-2"></input>
        <div className="flex flex-col items-start w-full">
        <textarea placeholder="Description" value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)} className=" placeholder:italic placeholder:text-black placeholder:text-xl   bg-[#F7F8F9]  w-full focus:outline-none hover:border-b-2 hover:duration-100 border-black p-1 text-area-for-note mb-4"></textarea>
           
           {wrongInput && <motion.div
           ref={scope}
           className="text-red-500 text-lg "
           >Input Field Empty</motion.div>}
           
        </div>
          
            <button onClick={()=>{handleStoringNote(inputValue,descriptionValue)
            
            if(wrongInput){
            errorAnimation()
            }
                setDescriptionValue('')
                setInputValue('')
            }} className="border-2 border-black text-sm  py-2 px-10 hover:scale-110 hover:duration-300">Add</button>
        </motion.div>
        </>
    )
}