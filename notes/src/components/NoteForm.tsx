import CreateableReactSelect from "react-select/creatable"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { NoteFormProps, Tag } from "../types/NoteTypes"
import {v4 as uuidV4} from 'uuid'



export default function NoteForm(props:NoteFormProps) {
    const {onSubmit, onAddTag, availableTags} = props

    const formStyle = {
        fontSize:'2rem',
        display:'flex',
        flexDirection:'column' as const,
        gap:'2rem'
    }
    const buttonStyle = {
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'
    }

    const titleRef=useRef<HTMLInputElement>(null)
    const markdownRef=useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectTags] = useState<Tag[]>([])
    const navigate = useNavigate()


    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            title:titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags:selectedTags
        })
        navigate("..")

    }



    return (
        <form onSubmit={handleSubmit}>
            <div style={formStyle}>
                <label>Title</label>
                <input required ref={titleRef}/>

                <label>Tags</label>
                <CreateableReactSelect 
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
                />

                <label>Body</label>
                <textarea required ref={markdownRef}/>
            </div>
            <div style={buttonStyle}>
                <button type='submit'>Save</button>
                <Link to="..">
                    <button>Cancel</button>
                </Link>

            </div>
        </form>
    )
}