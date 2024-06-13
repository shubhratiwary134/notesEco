

import AddNotePage from './AddNotePage'
import Note from './Note'



export const NotesList = ({notes,handleDeleteNotes}) => {
    
  return (
    <div className='Notes-list-container '>
        {notes.map((note,)=>{
          return( 
           <Note key={note.id} title={note.title} description={note.description} id={note.id} handleDeleteNotes={handleDeleteNotes} ></Note>
          )
         
        })}
       
    </div>
  )
}
