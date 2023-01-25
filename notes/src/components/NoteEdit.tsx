import { NoteData, Tag } from "../types/NoteTypes"
import NoteForm from "./NoteForm"
import { useNote } from "./NoteLayout"

type EditNoteProps = {
    onSubmit: (id:string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}
export default function NoteEdit(props:EditNoteProps) {
    const {onSubmit, onAddTag, availableTags} = props
    const note = useNote()
    return (
        <div>
            <NoteForm 
                onSubmit={data =>onSubmit(note.id, data)} 
                onAddTag={onAddTag} 
                availableTags={availableTags}
            />
        </div>
    )
}