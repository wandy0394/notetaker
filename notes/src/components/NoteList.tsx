import {useMemo, useState} from 'react'
import { Tag} from '../types/NoteTypes'
import Header from './common/Header'
import EditTagsModal from './EditTagsModal'
import NoteCard, { AddNoteCard, SimpleNote } from './NoteCard'

type NoteListProps = {
    availableTags: Tag[]
    notes: SimpleNote[]
    updateTag: (id:string, label:string) => void
    deleteTag: (id:string) => void
}




export default function NoteList(props:NoteListProps) {
    const {availableTags, notes, updateTag, deleteTag} = props
    const [selectedTags, setSelectTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<Boolean>(false)

    const filteredNotes = useMemo(()=>{
        return notes.filter(note=> {
            //(match titles or empty title) and (empty tags or
            //for every selected tag T, find all notes that have at least one tag t where T.id = t.id) 
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectedTags.length === 0 || selectedTags.every(tag=>note.tags.some(noteTag => noteTag.id === tag.id))) 
        })
    }, [title, selectedTags])
  
    return (
        <div className="relative">
            <Header 
                headerTitle='NoteTaker' 
                noteTitle={title} 
                onTitleChange={(e)=>setTitle(e)}
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagChange={e=>setSelectTags(e)}
                onEditClick={()=>setOpen(prev=>!prev)}
            >
            </Header>
          
          
            <div className='grid grid-cols-1 gap-y-8 items-center w-full py-52 p-8 md:gap-8 md:px-24 md:py-32 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                <AddNoteCard />
                {
                    filteredNotes.map(note=>{
                        return (
                            <NoteCard id={note.id} title={note.title} tags={note.tags} markdown={note.markdown}/>
                        )
                    })
                }
            </div>

          
            <EditTagsModal 
                open={open} 
                handleClose={()=>setOpen(false)} 
                availableTags={availableTags} 
                updateTag={updateTag} 
                deleteTag={deleteTag}
            />
        </div>
    )


}

