import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoteNew from './components/NoteNew'
import { RawNote, Tag, NoteData } from './types/NoteTypes'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo } from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteList from './components/NoteList'

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

  return (
      <div>
        <Routes>
          <Route path='/' element={<NoteList notes={notes} availableTags={tags}/>}></Route>
          <Route path='/:id'>
            <Route index element={<>Show</>}></Route>
            <Route path='edit' element={<>Edit</>}></Route>
          </Route>
          <Route path='/new' element={<NoteNew onSubmit={onNoteCreate} onAddTag={addTag} availableTags={tags}/>}></Route>
          <Route path='*' element={<Navigate to='/'/>}></Route>
        </Routes>
      </div>
  )
}



export default App
