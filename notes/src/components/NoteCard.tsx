import { Link } from "react-router-dom"
import { Tag } from "../types/NoteTypes"

export type SimpleNote = {
    tags: Tag[]
    title: string
    id: string
    markdown:string
}

function TagIcon(label:{label:string}) {
    return (
        <div className="rounded text-gray-200 bg-blue-700 px-2">
            {label.label}
        </div>
    )
}

export default function NoteCard({id, title, tags, markdown}:SimpleNote) {

    return (
            <Link to={`/${id}`}>
                <div className='flex flex-col items-center p-4 bg-blue-300 h-64 max-w-60 hover:bg-gray-300'>
                    <div className='flex flex-row items-start justify-between w-full'>
                        <div className="truncate text-3xl">
                            {title}
                        </div>
                        <div className='text-sm'>
                            01/01/01
                        </div>
                    </div>
                    <div className='py-2 flex flex-row gap-2 overflow-x-auto w-full'>
                        {
                            (tags !== undefined) && tags.map((tag)=>{
                                return <TagIcon label={tag.label}/>
                            })
                        }
                    </div>
                    <div className='flex-1 min-h-0 w-full break-words overflow-hidden'>
                        {markdown}
                    </div>
                </div>
            </Link>
    )
}

export function AddNoteCard() {

    return (
            <Link to={`/new`}>
                <div className='flex flex-col items-center border-4 border-dashed rounded border-gray-500 p-4 h-64 max-w-60 hover:bg-gray-300'>
                    <div className='text-xl'>
                        Add Note
                    </div>
 
                    <div className='text-9xl'>
                        +
                    </div>
                </div>
            </Link>
    )
}
