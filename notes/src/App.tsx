import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoteNew from './components/NoteNew'
import { RawNote, Tag, NoteData } from './types/NoteTypes'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo } from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteList from './components/NoteList'
import NoteLayout from './components/NoteLayout'
import Note from './components/Note'
import NoteEdit from './components/NoteEdit'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesTagged = useMemo(()=>{
    return notes.map(note=>{
      return {
        ...note, 
        tags: tags.filter((tag)=> {
          return note.tagIds.includes(tag.id)
        })
      }
    })
  }, [notes, tags])

  function addTag(tag:Tag) {
    setTags(prev=>[...prev, tag])
  }

  function updateTag(id: string, label:string) {
    setTags(prev=>{
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
    setTags(prev=>{
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

  return (
      <div className='h-full w-screen'>
        <Routes>
          <Route path='/' 
            element={
              <NoteList 
                notes={notesTagged} 
                availableTags={tags} 
                updateTag={updateTag} 
                deleteTag={deleteTag}
                onAddTag={addTag}
                onNoteCreate={onNoteCreate}
              />
            }
          />

          <Route path='/:id' element={<NoteLayout notes={notesTagged}/>}>
            <Route index element={<Note onDelete={onDeleteNote}/>}/>
            <Route path='edit' 
              element={
                <NoteEdit 
                  onSubmit={onUpdateNote} 
                  onAddTag={addTag} 
                  availableTags={tags}
                />
              }
            />
          </Route>

          <Route path='/new' 
            element={
              <NoteNew 
                onSubmit={onNoteCreate} 
                onAddTag={addTag} 
                availableTags={tags}
              />
            }
          />
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>
  )
}



export default App
