import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"
import { EditNoteProps, NoteData, NoteFormProps, Tag } from "../../types/NoteTypes"
import {v4 as uuidV4} from 'uuid'
import Translator from "../../api/translation-service"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import languages from "../../languages.json"
import TranslationForm from "./TranslationForm"

type NoteModalProps = {
    open: Boolean
    handleClose: ()=>void
    availableTags: Tag[]
    selectedTags: Tag[]
    setSelectedTags: Function
} & NoteFormProps

export default function NoteModal(props:NoteModalProps) {
    const {open, handleClose, availableTags, onAddTag, onSubmit, title="", markdown="", selectedTags, setSelectedTags} = props
    
    const titleRef=useRef<HTMLInputElement>(null)
    const markdownRef=useRef<HTMLTextAreaElement>(null)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            title:titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags:selectedTags
        })
        handleClose()
    }
    return (
        
        <form 
            onSubmit={handleSubmit} 
            className={`absolute left-1/2 top-1/4 -translate-x-1/2 bg-blue-100 p-4 w-1/2 ${open?'block':'hidden'}`}
        >
            
            <div className='flex flex-col gap-y-4'>
                <input 
                    className='rounded h-9 px-2 text-xl font-bold bg-transparent'
                    required ref={titleRef}  
                    defaultValue={title}
                    placeholder='Note title...'
                />
                <CreateableReactSelect 
                    styles={{
                        control:styles=>({
                            ...styles,
                            backgroundColor:'transparent',
                            border:'none',
                        }),
                        multiValue:styles=>({
                            ...styles,
                            backgroundColor: 'rgb(29,78,216)',
                            borderRadius:'4px',
                            color:'white'
                        }),
                        multiValueLabel:styles=>({
                            ...styles,
                            color:'white'
                        })
                    }}
                    onCreateOption={label => {
                        const newTag = {
                            id: uuidV4(),
                            label
                        }
                        onAddTag(newTag)
                        setSelectedTags((prev:any)=>[...prev, newTag])
                    }}
                    options={availableTags.map(tag=>{
                        return {
                            label:tag.label,
                            value:tag.id
                        }
                    })}
                    isMulti 
                    value={
                        selectedTags.map(tag=> {
                            return {label: tag.label, value: tag.id}
                        })
                    }
                    onChange = {
                        tags => {
                            setSelectedTags(tags.map(tag=>{
                                return {label:tag.label, id:tag.value}
                            }))
                        }
                    }
                    placeholder='Select Tags...'
                />

                <div className="flex gap-x-4 w-full items-center">
                    <textarea 
                        className='px-4 py-2 bg-blue-300 w-full resize-none'
                        style={{height:'30vh'}}
                        required 
                        ref={markdownRef} 
                        defaultValue={markdown} 
                        placeholder='Add notes...'
                    />
                </div>
               <TranslationForm/>
            </div>
            <div className='flex gap-x-4 py-4'>
                <button type='submit' className='w-full py-2 rounded-full text-xl text-white bg-blue-700 hover:bg-blue-400'>Save</button>
                <button type='button' onClick={handleClose} className='w-full py-2 rounded-full text-xl text-white bg-red-500 hover:bg-red-400'>Cancel</button>
            </div>
        </form>
    )
}