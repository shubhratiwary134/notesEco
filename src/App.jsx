import { useEffect,useState } from 'react'
import { db } from './firebase-config'
import './App.css'
import { NotesList } from './components/NotesList'
import { addDoc, collection, deleteDoc, doc, getDocs,query,orderBy,limit,startAfter, endBefore, limitToLast,updateDoc } from 'firebase/firestore'
import SearchBar from './components/SearchBar'
import AddNotePage from './components/AddNotePage'
import { LoadingPage } from './components/LoadingPage'
import Sidebar from './components/Sidebar'
import { motion } from 'framer-motion'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaChevronCircleDown, FaChevronDown, FaSortDown } from 'react-icons/fa'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'
import { CiCirclePlus } from 'react-icons/ci'
import { FaCirclePlus } from 'react-icons/fa6'
import { FiPlusCircle } from 'react-icons/fi'

function App() {
  const[notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)
  const [pageHistory, setPageHistory] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [firstVisible, setFirstVisible] = useState(null)
  const [isLastPage, setIsLastPage] = useState(false)
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [wrongInput,setWrongInput]=useState(false)
  const [expanded,setExpanded]=useState(true)
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

const loadNotes = async (startAfterDoc = null, endBeforeDoc = null, isPrevious = false) => {
  try {
    const notesCollection = collection(db, 'Notes');
    let notesQuery;

    if (startAfterDoc) {
      notesQuery = query(notesCollection, orderBy('pinned', 'desc'), orderBy('timeStamp', 'desc'), startAfter(startAfterDoc), limit(pageSize));
      setIsFirstPage(false);
    } else if (endBeforeDoc) {
      notesQuery = query(notesCollection, orderBy('pinned', 'desc'), orderBy('timeStamp', 'desc'), endBefore(endBeforeDoc), limitToLast(pageSize));
      setIsLastPage(false);
    } else {
      notesQuery = query(notesCollection, orderBy('pinned', 'desc'), orderBy('timeStamp', 'desc'), limit(pageSize));
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
        setPageHistory(prevHistory => [...prevHistory, noteSnapshot.docs[0]]); // Highlighted Change

      }
    } else {
      setFirstVisible(null);
      setLastVisible(null);
    }
    if (noteSnapshot.docs.length < pageSize) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  } catch (error) {
    console.error('Could not fetch data', error);
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
    const previousPage = pageHistory[pageHistory.length - 1]; 
    await loadNotes(null, previousPage, true);
    setPageHistory(prevHistory => prevHistory.slice(0, -1)); 
    if (pageHistory.length === 2) { 
      setIsFirstPage(true); 
    }
  }
  
  
};









  
  async function handleStoringNote(inputValue,descriptionValue){
    if(inputValue=='' || descriptionValue==''){
      setWrongInput(true)
      return
    }
    
  try{
  const notesCollection = collection(db,'Notes')
  const NoteRef= await addDoc(notesCollection,{
 // when the document gets added firebase adds the id by default , therefore we 
 //can use it later in the reference 
    title:inputValue,
    description:descriptionValue,
    timeStamp: new Date(),
    pinned:false,
  })
  setNotes([...notes,{
    id:NoteRef.id,//here we use the id provided by the firebase 
    title:inputValue,
    description:descriptionValue,
    timeStamp: new Date(),
    pinned:false,
  }])
}catch(error){
  console.error('could not add the notes')
}
  // to make sure the we read again when the notes are stored 
loadNotes()
      

  }
  async function handleDeleteNotes(id){
    try{
      const noteToBeDeleted = await doc(db,'Notes',id)
    deleteDoc(noteToBeDeleted)
    setNotes(notes.filter((note)=>note.id!==id))
    loadNotes()
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
       <div className='flex flex-col items-center' >
       <div className='flex flex-col '>
       <motion.div className='flex  shadow-xl bg-[#F4F4F4]  mb-4 '
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{duration:1}}
       >
       <SearchBar setSearchBarInput={setSearchBarInput}></SearchBar>
       </motion.div> 
       <div className='flex  lg:justify-between '>
       <div className=' shadow-2xl bg-white hidden lg:flex lg:w-1/5'>
       <Sidebar></Sidebar>
       </div>
       <div className='w-full flex flex-col items-center p-5 sm:items-stretch'>
       <div className='flex justify-between p-4'>
       <button onClick={handlePreviousPage} disabled={isFirstPage} className='hover:cursor-pointer '>
       <FaAngleLeft size={36} className='hover:scale-125 duration-200' />
       </button>
       <button onClick={handleNextPage} disabled={isLastPage} className='hover:cursor-pointer'>
       <FaAngleRight size={36} className='hover:scale-125 duration-200'/>
       </button>
       </div>
       
       <NotesList notes={notes.filter((note)=>note.title.toLowerCase().includes(searchBarInput)||note.description.toLowerCase().includes(searchBarInput))}
        handleDeleteNotes={handleDeleteNotes} 
        refreshNotes={loadNotes}
        ></NotesList>
       
       </div>
       </div>
      
  
   
     </div>
    
      <div className='w-full sticky bottom-2 p-5 flex flex-col items-center justify-center'>
        <div  >
          <button onClick={()=>{setExpanded(!expanded)}} >
            {expanded ? <FaCirclePlus size={48}/> : <FaSortDown size={72}  />  }
            
          </button>
        </div>
        <div className={`w-full  justify-center ${expanded ? 'hidden':'flex'}` }>
        <AddNotePage handleStoringNote={handleStoringNote} wrongInput={wrongInput} setWrongInput={setWrongInput}></AddNotePage>
        </div>
        
      </div>
       </div>
       
     
     
    
      
      
     
     </> 
    }
    </>
    
   
  
        

    
   
  )
}

export default App
