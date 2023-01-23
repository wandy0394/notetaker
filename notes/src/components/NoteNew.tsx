import { NoteData } from "../types/NoteTypes"
import NoteForm from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
}
export default function NoteNew(props:NewNoteProps) {
    const {onSubmit} = props
    return (
        <div>
            <NoteForm onSubmit={onSubmit}/>
        </div>
    )
}