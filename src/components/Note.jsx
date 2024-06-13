import { useState } from 'react'
import './note.css'
import Modal from 'react-modal'
Modal.setAppElement('#root')
export default function Note({title,description,id,handleDeleteNotes}){   
    const [modalState,setModalState]=useState(false)
    function openModal(){
        setModalState(true)
    }
    function closeModal(){
        setModalState(false)
    }
    return (
        <>
        <div onClick={openModal} className='note-container flex flex-col items-center rounded-xl justify-around  hover:scale-110 duration-200 bg-white text-white p-5 m-10   '>
            <h1 className="mb-4">{title}</h1> 
            <p   className=" min-h-32 w-full max-h-56 overflow-hidden mb-4" >{description}</p>
        <button  onClick={()=>handleDeleteNotes(id)} className=" border-2 w-20 text-black">X</button>
            
        </div>
        <Modal
         isOpen={modalState}
        onRequestClose={closeModal}
        contentLabel='Modal'
         className="modal"
         overlayClassName="modal-overlay"
        >
            <h1 className='mb-4 '>{title}</h1>
            <p>{description}</p>
            <button onClick={closeModal}>close</button>

        </Modal>
            
        </>
    )
}