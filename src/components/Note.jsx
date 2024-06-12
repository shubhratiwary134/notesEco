
export default function Note({title,description,id,handleDeleteNotes}){
   
    
    return (
        <>
        <div className=' flex flex-col items-center justify-around bg-amber-400 text-white p-10 m-10 max-w-56  '>
            <h1 className="mb-4">{title}</h1>
        <p className="min-h-32">{description}</p>
        <button  onClick={()=>handleDeleteNotes(id)} className="border-2 px-10 py-2">delete</button>
            
        </div>
            
        </>
    )
}