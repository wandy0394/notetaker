import { Link } from "react-router-dom"
import { Tag } from "../types/NoteTypes"

export type SimpleNote = {
    tags: Tag[]
    title: string
    id: string
}
const noteStyle = {
    minWidth:'280px',
    minHeight:'150px',
    height:'20vh',
    width:'40vh',
    border:'1px solid',
    borderRadius:'8px',
    boxShadow:'0 4px',
    display:'flex',
    flexDirection:'column' as const
}
export default function NoteCard({id, title, tags}:SimpleNote) {

    return (
            <Link to={`/${id}`}>
                <div style={noteStyle}>
                    <div>{title}</div>
                    <div>
                        {
                            tags.map((tag)=>{
                                return tag.label
                            })
                        }
                    </div>
                </div>
            </Link>
    )
}