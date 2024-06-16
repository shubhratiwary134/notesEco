import { useState } from 'react'
import './note.css'
import Modal from 'react-modal'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdOutlinePinDrop, MdPinDrop } from 'react-icons/md'
import { db } from '../firebase-config'
import { doc,updateDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'


Modal.setAppElement('#root')
export default function Note({title,description,id,handleDeleteNotes,pinned,refreshNotes}){   
    const [modalState,setModalState]=useState(false)
    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }
    const handlePinNote = async () => {
        const noteRef = doc(db, 'Notes', id);
        await updateDoc(noteRef, { pinned: !pinned });
        refreshNotes();
        // Optionally refresh notes without page reload
    };
    return (
        <>
        <div onClick={openModal}  className='note-container flex flex-col items-center bg-white   justify-around  shadow-xl  backdrop:blur   text-black p-10 hover:shadow-2xl'>
            <div className='w-full hover:scale-105 duration-200'>
            
          <div className='flex items-center justify-between'>
          <h1 className="mb-4  text-2xl ">{title}</h1> 
            <button onClick={(e) => { e.stopPropagation(); handlePinNote(); }}>
            {pinned ? <MdPinDrop size={24} /> : <MdOutlinePinDrop size={24} />}
          </button>
          </div>
            <hr ></hr>
            <p className=" h-32 w-full  overflow-hidden my-4 text-lg" >{description}</p>
        <button  onClick={()=>handleDeleteNotes(id)} className='mt-10 flex w-full justify-end' >
        <RiDeleteBin6Line  size={24}/>
        </button>
        
            </div>
           
            
        </div>
        <Modal
         isOpen={modalState}
        onRequestClose={closeModal}
        contentLabel='Modal'
         className="modal"
         overlayClassName="modal-overlay"
        >
            <motion.div
            initial={{opacity:0,translateY:-100}}
            animate={{opacity:1,translateY:0}}
            transition={{duration:1}}
            className='h-full p-5 flex flex-col justify-around items-start'
            >
                <div className='flex w-full justify-between'>
                <h1 className='mb-4 text-7xl'>{title}</h1>
            <button onClick={(e) => { e.stopPropagation(); handlePinNote(); }}>
            {pinned ? <MdPinDrop size={48} /> : <MdOutlinePinDrop size={48} />}
          </button>
                </div>
            
            
            <p className='text-xl'>{description}</p>
            <motion.button onClick={closeModal} className='border-2 border-black px-10 py-2'
            whileHover={{scale:1.25}}
            >Close</motion.button>
            <button  onClick={()=>handleDeleteNotes(id)} className='mt-10 flex w-full justify-end'  >
        <RiDeleteBin6Line  size={24}/>
        </button>
            </motion.div>
         

        </Modal>
            
        </>
    )
}