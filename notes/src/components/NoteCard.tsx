import { Link } from "react-router-dom"
import { Tag } from "../types/NoteTypes"

export type SimpleNote = {
    tags: Tag[]
    title: string
    id: string
    markdown:string
}
const noteStyle = {
    // minWidth:'280px',
    // minHeight:'150px',
    // height:'20vh',
    // width:'40vh',
    border:'1px solid',
    borderRadius:'8px',
    boxShadow:'0 4px',
    display:'flex',
    flexDirection:'column' as const
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
                <div className='flex flex-col items-center p-2 bg-blue-300 h-64 max-w-60'>
                    <div className='flex flex-row items-start justify-between text-3xl w-full'>
                        {title}
                        <div className='text-sm'>
                            01/01/01
                        </div>
                    </div>
                    <div className='py-2 flex flex-row gap-x-2'>
                        {
                            tags.map((tag)=>{
                                return <TagIcon label={tag.label}/>
                            })
                        }
                    </div>
                    <div className='flex-1 w-full'>
                        {markdown}
                    </div>
                </div>
            </Link>
    )
}