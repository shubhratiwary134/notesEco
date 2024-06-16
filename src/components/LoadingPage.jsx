
import loadingGif from '../assets/Illustration.gif'
export const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <img src={loadingGif} className='  md:h-auto'/>
    </div>
  )
}
