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


  return (
      <div className='h-full w-screen'>
        <Routes>
          <Route path='/' 
            element={
              <NoteList 
                // notes={notesTagged} 
                // availableTags={tags} 
                // updateTag={updateTag} 
                // deleteTag={deleteTag}
                // onAddTag={addTag}
                // onNoteCreate={onNoteCreate}
              />
            }
          />

          {/* <Route path='/:id' element={<NoteLayout notes={notesTagged}/>}>
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
          /> */}
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>
  )
}



export default App
