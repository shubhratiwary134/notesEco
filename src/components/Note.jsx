
export default function Note({title,description,id,handleDeleteNotes}){
    
    return (
        <>
        <div className="note-container">
            <div style={{padding:'10em',width:'20%'}}> 
            <h1>{title}</h1>
        <p>{description}</p>
        <button  onClick={()=>handleDeleteNotes(id)}>delete</button>
            </div>
        
        </div>
            
        </>
    )
}