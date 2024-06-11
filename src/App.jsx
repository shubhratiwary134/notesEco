import { useState } from 'react'
import { db } from './firebase-config'

import './App.css'
import { NotesList } from './components/NotesList'

function App() {
  const[notes,setNotes]=useState([])
  const [addNote,setAddNotes]=useState(false)
  const [inputValue,setInputValue]=useState('')
  const [descriptionValue,setDescriptionValue]=useState('')
  console.log('db',db)
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
        <NotesList notes={notes} handleDeleteNotes={handleDeleteNotes}></NotesList>
        </div>

     

    </>
   
  )
}

export default App
