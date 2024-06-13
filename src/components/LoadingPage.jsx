
import loadingGif from '../assets/Liquid.gif'
export const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
        <img src={loadingGif} className='w-full h-full md:h-auto'/>
    </div>
  )
}
