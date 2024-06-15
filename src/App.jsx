import { useEffect,useState } from 'react'
import { db } from './firebase-config'
import './App.css'
import { NotesList } from './components/NotesList'
import { addDoc, collection, deleteDoc, doc, getDocs,query,orderBy,limit,startAfter, endBefore, limitToLast } from 'firebase/firestore'
import SearchBar from './components/SearchBar'
import AddNotePage from './components/AddNotePage'
import { LoadingPage } from './components/LoadingPage'
import Sidebar from './components/Sidebar'
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

function App() {
  const[notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)
  const [pageHistory, setPageHistory] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [firstVisible, setFirstVisible] = useState(null)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(true)

  const pageSize = 6
  // when the search bar is empty the value for the .includes('') is true for all therefore on empty input field the notes list is complete , this is better than the equal to condition as with this we target the substring .
  const [searchBarInput,setSearchBarInput]=useState('')
  useEffect(()=>{
    
    setTimeout(()=>{
      setLoading(false)
    },2000)// 2 or 6 0r 11 

    const fetchInitialNotes = async () => {
      try {
          await loadNotes();
      } catch (error) {
          console.error('Error fetching initial notes:', error);  
      }
  };
  
    // async function getNotes(){
    //   try{
    //     const notesCollection=collection(db,'Notes')
    //     const NoteStorage =  await getDocs(notesCollection)
    //     const NotesArray = []
    //     // even if we do not add the id property in setNotes(while storing function works) still
    //     // when the useEffect works i.e when the component mounts, it stores the notes array with the documents and each have the id 
    //     NoteStorage.forEach((doc) => {
    //         NotesArray.push({id:doc.id,...doc.data()})
    //     });
    //     setNotes(NotesArray)
    //   }catch(error){
    //     console.error('could not fetch data ')
    //   }
    // }
    // getNotes()
fetchInitialNotes()

},[])

const loadNotes = async (startAfterDoc = null, endBeforeDoc = null,isPrevious = false) => {
  
  try {
    const notesCollection = collection(db, 'Notes');
    let notesQuery = query(notesCollection, orderBy('timeStamp'), limit(pageSize));
    

    if (startAfterDoc) {
      notesQuery = query(notesQuery, startAfter(startAfterDoc), limit(pageSize));
      setIsFirstPage(false);
    } else if (endBeforeDoc) {
      notesQuery = query(notesQuery, endBefore(endBeforeDoc), limitToLast(pageSize));
      setIsLastPage(false);
    } else {
      setIsFirstPage(true);
      setIsLastPage(false);
    }

    const noteSnapshot = await getDocs(notesQuery);
    const notesArray = noteSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setNotes(notesArray);

    if (noteSnapshot.docs.length > 0) {
      setFirstVisible(noteSnapshot.docs[0]);
      setLastVisible(noteSnapshot.docs[noteSnapshot.docs.length - 1]);
      if (!isPrevious) {
        setPageHistory([...pageHistory, noteSnapshot.docs[0]]);
      }
    } else {
      setFirstVisible(null);
      setLastVisible(null);
    }
  } catch (error) {
    console.error('Could not fetch data ', error);
  }
};


const handleNextPage = async () => {
  if (lastVisible) {
    try {
     
      setPageHistory([...pageHistory, firstVisible]);
      await loadNotes(lastVisible);
     
      setIsFirstPage(false);
    } catch (error) {
      console.error('Error loading next page:', error);
    }
  }
};

const handlePreviousPage = async () => {
  if (pageHistory.length > 0) {
    try {
      
      const previousPage = pageHistory[pageHistory.length - 1];
      await loadNotes(null, previousPage);
      setPageHistory(pageHistory.slice(0, -1));
      
      if (pageHistory.length === 1) {
        setIsFirstPage(true);
      }
    } catch (error) {
      console.error('Error loading previous page:', error);
    }
  }
};






  
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
       <div className='w-3/4 p-5 '>
       <div className='flex justify-between m-4 p-4'>
       <button onClick={handlePreviousPage} disabled={isFirstPage} className='hover:cursor-pointer '>
       <FaAngleLeft size={36} className='hover:scale-125 duration-200' />
       </button>
       <button onClick={handleNextPage} disabled={isLastPage} className='hover:cursor-pointer'>
       <FaAngleRight size={36} className='hover:scale-125 duration-200'/>
       </button>
       </div>
       
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
