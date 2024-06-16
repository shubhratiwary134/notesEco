
import loadingGif from '../assets/Illustration.gif'
export const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-[#F4F4F4]'>
        <img src={loadingGif} className='  md:h-auto'/>
    </div>
  )
}
