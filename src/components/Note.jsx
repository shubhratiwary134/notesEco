export default function Note({title,description,id}){
    console.log(id)
    return (
        <>
        <div style={{width:'200px', height:'200px'}}>
        <h1>{title}</h1>
        <p>{description}</p>
        </div>
            
        </>
    )
}