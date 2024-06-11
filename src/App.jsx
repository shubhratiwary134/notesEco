import { useState } from 'react'
import Note from './components/Note'

import './App.css'

function App() {
  const[notes,setNotes]=useState([])
  const [addNote,setAddNotes]=useState(false)
  const [inputValue,setInputValue]=useState('')
  const [descriptionValue,setDescriptionValue]=useState('')
  function handleAddNotes() {
    setAddNotes(!addNote)
  }
  function handleStoringNote(){
    setNotes([
      ...notes,
      {
        'id':Date.now().toLocaleString(),
        'title':inputValue,
        'description':descriptionValue
      }
  ])
  }
  function handleDeleteNotes(id){
    const newNotes = notes.filter((note)=>note.id!==id)
    setNotes(newNotes)
  }

  return (
    <>
       <p>Notes app begins </p>
       <button onClick={handleAddNotes}>Add note</button>
       {addNote && <div>
        <input type='text' placeholder='title' value={inputValue} onChange={(e)=>setInputValue(e.target.value)}></input>
          <textarea  placeholder='enter the description' value={descriptionValue} onChange={(e)=>setDescriptionValue(e.target.value)}></textarea>
          <button onClick={handleStoringNote}>submit</button>
        </div>}
        <div>
        {notes.map((note)=>{
          return( 
           <Note key={note.id} title={note.title} description={note.description} id={note.id} handleDeleteNotes={handleDeleteNotes} ></Note>
          )
        })}
        </div>
     

    </>
   
  )
}

export default App
