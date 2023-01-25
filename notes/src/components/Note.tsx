import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'

type NoteProps = {
    onDelete: (id:string) => void
}
export default function Note({onDelete}:NoteProps) {
    const note = useNote()
    const navigate = useNavigate()
    return <>
        <div>
            <div>{note.title}</div>
            <div>
                <Link to={`/${note.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button 
                    onClick={()=>{
                        onDelete(note.id)
                        navigate('/')
                    }}
                >
                    Delete
                </button>
                <Link to='/'>
                    <button>Back</button>
                </Link>
            </div>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>

        </div>
    </>
}