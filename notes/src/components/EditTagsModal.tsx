import { Tag } from "../types/NoteTypes"
import {IoMdClose} from "react-icons/io"

type EditTagsModalProps = {
    open: Boolean
    handleClose:()=>void
    availableTags: Tag[]
    updateTag: (id:string, label:string) => void
    deleteTag: (id:string) => void
}

export default function EditTagsModal(props:EditTagsModalProps) {
    const {open, handleClose, availableTags, updateTag, deleteTag} = props

    return (
        <div className={`absolute p-8 top-0 right-0 h-screen bg-gray-300 flex flex-col gap-y-8 ${open?'block':'hidden'}`}>
            <div className='flex justify-between items-center'>
                <div className='text-4xl'>
                    Edit Tags
                </div>
                <IoMdClose size={30} className='hover:text-red-500' onClick={handleClose}/>

            </div>
            <div className='flex flex-col'>
                <div className='flex flex-col gap-y-2'>
                    {
                        availableTags.map(tag=>{
                            return (
                                <div className='flex items-center justify-between gap-x-2'>
                                    <input 
                                        className='h-8 text-white bg-blue-700 px-4 rounded focus:bg-blue-200 focus:text-black'
                                        defaultValue={tag.label} 
                                        onChange={(e)=>updateTag(tag.id, e.target.value)}
                                    />
                                    <IoMdClose size={20} className='hover:text-red-500' onClick={()=>deleteTag(tag.id)}/>
                                </div>
                            )
                        })
                    }

                </div>
                
            </div>
        </div>
    )
}