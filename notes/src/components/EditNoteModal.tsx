import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"
import { NoteData, NoteFormProps, Tag, EditNoteProps } from "../types/NoteTypes"
import {v4 as uuidV4} from 'uuid'
import Translator from "../api/translation-service"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import languages from "../languages.json"
import TranslationForm from "./common/TranslationForm"
import NoteModal from "./common/NoteModal"


type EditNoteModalProps = {
    open: Boolean
    handleClose: ()=>void
    availableTags: Tag[]
    selectedNote: EditNoteProps
} & NoteFormProps

export default function EditNoteModal(props:EditNoteModalProps) {
    const {open, handleClose, availableTags, onAddTag, onSubmit, selectedNote} = props
 

    const [selectedTags, setSelectedTags] = useState<Tag[]>([...selectedNote.tags])
    
    useEffect(()=>{
        setSelectedTags(selectedNote.tags)
    }, [selectedNote])

    return (
        <div>
            <NoteModal 
                open={open}
                handleClose={handleClose}
                availableTags={availableTags}
                onAddTag={onAddTag}
                onSubmit={onSubmit}
                title={selectedNote.title}
                markdown={selectedNote.markdown}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
            />  
        </div>
    )
}