import { useEffect,useState } from 'react'
import { db } from './firebase-config'

import './App.css'
import { NotesList } from './components/NotesList'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import SearchBar from './components/SearchBar'
import AddNotePage from './components/AddNotePage'

function App() {
  const[notes,setNotes]=useState([])
  useEffect(()=>{
    async function getNotes(){
      try{
        const notesCollection=collection(db,'Notes')
        const NoteStorage =  await getDocs(notesCollection)
        const NotesArray = []
        // even if we do not add the id property in setNotes(while storing function works) still
        // when the useEffect works i.e when the component mounts, it stores the notes array with the documents and each have the id 
        NoteStorage.forEach((doc) => {
            NotesArray.push({id:doc.id,...doc.data()})
        });
        setNotes(NotesArray)
      }catch(error){
        console.error('could not fetch data ')
      }
    }
    getNotes()
},[])
  
  async function handleStoringNote(inputValue,descriptionValue){
    
  try{
  const notesCollection = collection(db,'Notes')
  const NoteRef= await addDoc(notesCollection,{
 // when the document gets added firebase adds the id by default , therefore we 
 //can use it later in the reference 
    title:inputValue,
    description:descriptionValue,
    timeStamp: new Date(),
  })
  setNotes([...notes,{
    id:NoteRef.id,//here we use the id provided by the firebase 
    title:inputValue,
    description:descriptionValue,
    timeStamp: new Date()
  }])
}catch(error){
  console.error('could not add the notes')
}
  
      

  }
  async function handleDeleteNotes(id){
    try{
      const noteToBeDeleted = await doc(db,'Notes',id)
    deleteDoc(noteToBeDeleted)
    setNotes(notes.filter((note)=>note.id!==id))
    }catch(error){
      console.error('error while deleting')
    }
    

  }

  return (
    <>
    
    <div className='flex flex-col  max-w-screen-xl mr-auto ml-auto p-5'>
          <div className='flex flex-col items-center'>
          <h1>notes app</h1>
          <SearchBar></SearchBar>
          </div> 
        <NotesList notes={notes} handleDeleteNotes={handleDeleteNotes} ></NotesList>
      
        </div>
    
        <AddNotePage handleStoringNote={handleStoringNote}></AddNotePage>
  
        

    </>
   
  )
}

export default App
