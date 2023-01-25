import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
export default function Note() {
    const note = useNote()
    return <>
        <div>
            <div>{note.title}</div>
            <div>
                <Link to={`/${note.id}/edit`}>
                    <button>Edit</button>
                </Link>
                <button>Delete</button>
                <Link to='/'>
                    <button>Back</button>
                </Link>
            </div>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>

        </div>
    </>
}