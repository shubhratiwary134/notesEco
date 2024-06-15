import { FaRegBell, FaRegLightbulb} from "react-icons/fa";

import { IoPencil } from "react-icons/io5";
import { MdOutlineArchive } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function Sidebar(){
    return(
        <div className="w-full ">
          <div className="flex flex-col   ">
            <div className=" p-10 flex gap-2  items-center hover:bg-white hover:cursor-pointer">
            <FaRegLightbulb size={24}/>
                <p className="text-xl">Notes</p>
            </div>
            <div className="p-10 flex gap-2  items-center hover:bg-white  hover:cursor-pointer">
                <FaRegBell size={24}/>
            <p className="text-xl">Reminder</p>
            </div>
            <div className="p-10 flex gap-2  items-center hover:bg-white hover:cursor-pointer">
                <IoPencil size={24}/>
            <p className="text-xl">Edit labels</p>
            </div>

            <div className="p-10 flex gap-2  items-center hover:bg-white hover:cursor-pointer">
            <MdOutlineArchive size={24}/>
            <p className="text-xl">Archives</p>
            </div>
            <div className="p-10 flex gap-2  items-center hover:bg-white hover:cursor-pointer">
            <RiDeleteBin6Line size={24}/>
            <p className="text-xl">Bin</p>
            </div>
          </div>
        </div>
    )
}