import { Link } from "react-router-dom"
import { Note, Tag } from "../types/NoteTypes"
import EditNoteModal from "./EditNoteModal"
import {IoMdClose} from "react-icons/io"

export type Props = {
    onSelect: ()=>void
    onDelete: (id:string)=>void
    note: Note
} 

function TagIcon(label:{label:string}) {
    return (
        <div className="rounded text-gray-200 bg-blue-700 px-2">
            {label.label}
        </div>
    )
}

export default function NoteCard({note, onDelete, onSelect}:Props) {

    return (
            
        <div className='flex flex-col items-start bg-blue-300 h-64 max-w-60 hover:bg-gray-300'> 
            <div className='group flex flex-row items-center justify-between w-full bg-blue-200 p-2'>
                <div className="truncate text-3xl">
                    {note.title}
                </div>
                <div>
                    <IoMdClose size={30} className='hidden group-hover:block hover:text-red-500' onClick={()=>onDelete(note.id)}/>
                </div>
                <div className='text-sm'>
                    {note.dateStamp}
                </div>
            </div>
            <div onClick={onSelect} className='w-full h-full'>
                <div className='py-2 flex flex-row gap-2 overflow-x-auto w-full px-2'>
                    {
                        (note.tags !== undefined) && note.tags.map((tag)=>{
                            return <TagIcon label={tag.label}/>
                        })
                    }
                </div>
                <div className='flex-1 min-h-0 w-full break-words overflow-hidden px-2'>
                    {note.markdown}
                </div>
            </div>
        </div>
         
    )
}


type AddNoteProps = {
    onOpen: ()=>void
}

export function AddNoteCard({onOpen}:AddNoteProps) {

    return (
            
        <div 
            className='flex flex-col items-center border-4 border-dashed rounded border-gray-500 p-4 h-64 max-w-60 hover:bg-gray-300' 
            onClick={onOpen}
        >
            <div className='text-xl'>
                Add Note
            </div>

            <div className='text-9xl'>
                +
            </div>
        </div>
            
    )
}
