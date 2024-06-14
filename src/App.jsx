import { useEffect,useState } from 'react'
import { db } from './firebase-config'

import './App.css'
import { NotesList } from './components/NotesList'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import SearchBar from './components/SearchBar'
import AddNotePage from './components/AddNotePage'
import { LoadingPage } from './components/LoadingPage'
import Sidebar from './components/Sidebar'


function App() {
  const[notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)
  // when the search bar is empty the value for the .includes('') is true for all therefore on empty input field the notes list is complete , this is better than the equal to condition as with this we target the substring .
  const [searchBarInput,setSearchBarInput]=useState('')
  useEffect(()=>{
  
    setTimeout(()=>{
      setLoading(false)
    },5000)// 2 or 6 0r 11 
  
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
    {
      loading ?
       <LoadingPage></LoadingPage> : 
     
      <>
       
       <div className='flex flex-col'>
       <div className='flex  shadow-xl bg-[#F4F4F4]  mb-4'>
       <SearchBar setSearchBarInput={setSearchBarInput}></SearchBar>
       </div> 
       <div className='flex'>
       <div className='w-1/4 '>
       <Sidebar></Sidebar>
       </div>
       <div className='w-3/4 p-10'>
       <NotesList notes={notes.filter((note)=>note.title.toLowerCase().includes(searchBarInput)||note.description.toLowerCase().includes(searchBarInput))} handleDeleteNotes={handleDeleteNotes} ></NotesList>
       </div>
       </div>
      
  
   
     </div>
     
      <AddNotePage handleStoringNote={handleStoringNote}></AddNotePage>
     
    
      
      
     
     </> 
    }
    </>
    
   
  
        

    
   
  )
}

export default App
