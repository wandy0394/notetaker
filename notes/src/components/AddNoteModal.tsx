import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"
import { NoteData, NoteFormProps, Tag } from "../types/NoteTypes"
import {v4 as uuidV4} from 'uuid'
import Translator from "../api/translation-service"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import languages from "../languages.json"
import NoteModal from "./common/NoteModal"

type AddNoteModalProps = {
    open: Boolean
    handleClose: ()=>void
    availableTags: Tag[]

} & NoteFormProps

export default function AddNoteModal(props:AddNoteModalProps) {
    const {open, handleClose, availableTags, onAddTag, onSubmit, title="", markdown="", tags=[]} = props

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    
    return (
        <NoteModal 
            open={open}
            handleClose={handleClose}
            availableTags={availableTags}
            onAddTag={onAddTag}
            onSubmit={onSubmit}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
        />   
     
    )
}