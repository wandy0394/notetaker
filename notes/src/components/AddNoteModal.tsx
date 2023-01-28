import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import CreateableReactSelect from "react-select/creatable"
import { NoteData, NoteFormProps, Tag } from "../types/NoteTypes"
import {v4 as uuidV4} from 'uuid'
import Translator from "../api/translation-service"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import languages from "../languages.json"

type AddNoteModalProps = {
    open: Boolean
    handleClose: ()=>void
    availableTags: Tag[]
    // title:string 
    // markdown:string 
    // tags:Tag[]
    // onAddTag:(tag:Tag) => void
    // onSubmit: (data: NoteData) => void
} & NoteFormProps

export default function AddNoteModal(props:AddNoteModalProps) {
    const {open, handleClose, availableTags, onAddTag, onSubmit, title="", markdown="", tags=[]} = props
    
    const titleRef=useRef<HTMLInputElement>(null)
    const markdownRef=useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectTags] = useState<Tag[]>(tags)
    const [translatedText, setTranslatedText] = useState<string>('')
    const [sourceText, setSourceText] = useState<string>('')
    const [targetLang, setTargetLang] = useState<string>('en')
    const [sourceLang, setSourceLang] = useState<string>('en')
    const navigate = useNavigate()

    useEffect(()=>{
        console.log(targetLang)
    }, [targetLang])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            title:titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags:selectedTags
        })
        handleClose()
    }
    function handleTranslate(e: FormEvent) {
        e.preventDefault()
        // let markdown = markdownRef.current!.value
        Translator.translate(sourceText, sourceLang, targetLang)
            .then((result)=>{
                console.log(result)
                setTranslatedText(result.output)
            })
            .catch((result)=>{
                console.log(result)
            })
    }
    return (
        
        <form 
            onSubmit={handleSubmit} 
            className={`absolute left-1/2 top-1/4 -translate-x-1/2 bg-blue-100 p-4 w-1/2 ${open?'block':'hidden'}`}
        >
            
            <div className='flex flex-col gap-y-4 '>
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
                        setSelectTags(prev=>[...prev, newTag])
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
                            setSelectTags(tags.map(tag=>{
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
                <input className='px-4' placeholder='What do you want to translate..?' value={sourceText} onChange={(e)=>setSourceText(e.target.value)}></input>
                <input className='px-4' placeholder='...' value={translatedText} disabled></input>
                <div className='flex items-end justify-between gap-x-4 w-full'>
                    <div className='flex flex-col items-start gap-x-2'>
                        <p className='text-xs'>Translate from:</p>
                        <select className='bg-transparent rounded' onChange={(e)=>setSourceLang(e.target.value)}>
                            {
                                Object.entries(languages).map(([code, name])=>{
                                    return (
                                        code === 'en' ?
                                        (<option selected value={code} label={name}></option>):
                                        (<option value={code} label={name}></option>)
                                        )
                                    })
                                }

                        </select>
                    </div>
                    <div className='flex flex-col items-start gap-x-2'>
                        <p className='text-xs'>To:</p>
                        <select className='bg-transparent rounded' onChange={(e)=>setTargetLang(e.target.value)}>
                            {
                                Object.entries(languages).map(([code, name])=>{
                                    return (
                                        <option value={code} label={name}></option>
                                        )
                                    })
                                }

                        </select>
                    </div>
                    <button onClick={handleTranslate} className='px-2 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-400'>Go</button> 

                </div>
            </div>
            <div className='flex gap-x-4 py-4'>
                <button type='submit' className='w-full py-2 rounded-full text-xl text-white bg-blue-700 hover:bg-blue-400'>Save</button>
                <button onClick={handleClose} className='w-full py-2 rounded-full text-xl text-white bg-red-500 hover:bg-red-400'>Cancel</button>
            </div>
        </form>
    )
}