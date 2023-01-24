import { NoteData, Tag } from "../types/NoteTypes"
import NoteForm from "./NoteForm"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}
export default function NoteNew(props:NewNoteProps) {
    const {onSubmit, onAddTag, availableTags} = props
    return (
        <div>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
        </div>
    )
}