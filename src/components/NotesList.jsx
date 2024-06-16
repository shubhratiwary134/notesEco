


import Note from './Note'
import { motion } from "framer-motion"



export const NotesList = ({notes,handleDeleteNotes,refreshNotes}) => {
    
  return (
    <div className='Notes-list-container '>
        {notes.map((note,i)=>{
          return( 
            <motion.div key={note.id}
            initial={{opacity:0,translateX:-50}}
            animate={{opacity:1,translateX:0}}
            transition={{duration:1,delay:i*.1}}
            >
                 <Note key={note.id} title={note.title} description={note.description} id={note.id} pinned={note.pinned} handleDeleteNotes={handleDeleteNotes}
           refreshNotes={refreshNotes}
           ></Note>
            </motion.div>
        
          )
        })}
       
    </div>
  )
}
