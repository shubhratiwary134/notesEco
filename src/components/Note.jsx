
export default function Note({title,description,id}){
    
    return (
        <>
        <div className="note-container">
            <div style={{padding:'10em'}}> 
            <h1>{title}</h1>
        <p>{description}</p>
        <button >delete</button>
            </div>
        
        </div>
            
        </>
    )
}