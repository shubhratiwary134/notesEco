
import loadingGif from '../assets/Book.gif'
export const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <img src={loadingGif} className='w-full h-full md:h-auto'/>
    </div>
  )
}
