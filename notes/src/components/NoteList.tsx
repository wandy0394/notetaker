import {useEffect, useMemo, useState} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Tag, NoteData, RawNote, EditNoteProps} from '../types/NoteTypes'
import AddNoteModal from './AddNoteModal'
import Header from './common/Header'
import EditTagsModal from './EditTagsModal'
import NoteCard, { AddNoteCard, SimpleNote } from './NoteCard'
import {v4 as uuidV4} from 'uuid'
import EditNoteModal from './EditNoteModal'

type NoteListProps = {
    availableTags?: Tag[]
    notes?: SimpleNote[]
    updateTag?: (id:string, label:string) => void
    deleteTag?: (id:string) => void
    onAddTag?: (tag: Tag) => void
    onNoteCreate?: (data:NoteData) => void
}




export default function NoteList(props:NoteListProps) {
    // const {availableTags, onAddTag} = props
    const [selectedTags, setSelectTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<Boolean>(false)
    const [addOpen, setAddOpen] = useState<Boolean>(false)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>("TAGS", [])
    const [selectedNote, setSelectedNote] = useState<EditNoteProps>({id:'', title:'', markdown:'', tagIds:[], tags:[]})

    useEffect(()=>{
        console.log('Tag changed')
    },[availableTags])

    const notesTagged = useMemo(()=>{
      return notes.map(note=>{
        return {
          ...note, 
          tags: availableTags.filter((tag)=> {
            return note.tagIds.includes(tag.id)
          })
        }
      })
    }, [notes, availableTags])
  
    function onAddTag(tag:Tag) {
      setAvailableTags(prev=>[...prev, tag])
    }
  
    function updateTag(id: string, label:string) {
      setAvailableTags(prev=>{
        return prev.map(tag=> {
          if (tag.id === id) {
            return {...tag, label:label}
          }
          else {
            return tag
          }
        })
      })
    }
  
    function deleteTag(id: string) {
      setAvailableTags(prev=>{
        return prev.filter(tag=>{
          return tag.id !== id
        })
      })
    }
    function onNoteCreate({tags, ...data}: NoteData):void {
      setNotes (prev=>{
        return [
          ...prev, 
          {
            ...data, 
            id:uuidV4(), 
            tagIds:tags.map((tag)=>{
              return tag.id
            })
          }
        ]
      })
    }
  
    function onDeleteNote(id:string) {
      setNotes(prev=>{
        return prev.filter(note=>{
          return note.id !== id
        })
      })
    }
  
    function onUpdateNote(id:string, {tags, ...data}:NoteData) {
      setNotes (prev=>{
        return (prev.map(note=>{
          if (note.id === id) {
            return {
              ...note, 
              ...data, 
              tagIds: tags.map(tag=>tag.id)
            }
          }
          else {
            return note
          }
        }))
      })
    }


    const filteredNotes = useMemo(()=>{
        return notesTagged.filter(note=> {
            //(match titles or empty title) and (empty tags or
            //for every selected tag T, find all notes that have at least one tag t where T.id = t.id) 
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectedTags.length === 0 || selectedTags.every(tag=>note.tags.some(noteTag => noteTag.id === tag.id))) 
        })
    }, [title, selectedTags, notesTagged, availableTags])
  
    function selectNote(note:EditNoteProps) {
        setSelectedNote(note)
        setEditOpen(true)
    }

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
                <AddNoteCard onOpen={()=>setAddOpen(true)}/>
                {
                    filteredNotes.map(note=>{
                        return (
                            <NoteCard 
                              key={note.id} 
                              onDelete={onDeleteNote}
                              // title={note.title} 
                              // tags={note.tags} 
                              // markdown={note.markdown} 
                              // dateStamp = {note.dateStamp}
                              note={note} 
                              onSelect={()=>selectNote(note)}/>
                        )
                    })
                }
            </div>
            <AddNoteModal 
                availableTags={availableTags} 
                open={addOpen} 
                handleClose={()=>setAddOpen(false)}
                onSubmit={onNoteCreate} 
                onAddTag={onAddTag} 
            />
            <EditNoteModal
                availableTags={availableTags} 
                open={editOpen} 
                handleClose={()=>setEditOpen(false)}
                onSubmit={(data:any)=>onUpdateNote(selectedNote.id, data)} 
                onAddTag={onAddTag} 
                selectedNote={selectedNote}
            />
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

