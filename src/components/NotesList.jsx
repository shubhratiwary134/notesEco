
import Note from './Note'

export const NotesList = ({notes,handleDeleteNotes}) => {
  return (
    <div>
        {notes.map((note)=>{
          return( 
           <Note key={note.id} title={note.title} description={note.description} id={note.id} handleDeleteNotes={handleDeleteNotes} ></Note>
          )
        })}
    </div>
  )
}
