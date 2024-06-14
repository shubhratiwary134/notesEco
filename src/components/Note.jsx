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
        <div onClick={openModal}  className='note-container flex flex-col items-center bg-white  justify-around  shadow-xl  backdrop:blur   text-black p-10 hover:shadow-2xl'>
            <div className='w-full hover:scale-110 duration-200'>
            <h1 className="mb-4  text-3xl">{title}</h1> 
            <hr ></hr>
            <p   className=" h-32 w-full  overflow-hidden mb-4 text-lg" >{description}</p>
        <button  onClick={()=>handleDeleteNotes(id)} className=" border-2 w-20 text-black">X</button>
            </div>
           
            
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