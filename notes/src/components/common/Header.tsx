import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "../../types/NoteTypes"
import {HiPencil} from "react-icons/hi/"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"



type HeaderProps = {
    headerTitle:string
    noteTitle:string
    availableTags:Tag[]
    selectedTags:Tag[]
    onTitleChange: (value:string) => void
    onTagChange: (tags: Tag[]) => void
    onEditClick: ()=>void
    children?:any
}

export default function Header(props:HeaderProps) {
    const {headerTitle, availableTags, selectedTags, noteTitle, onTagChange, onTitleChange, onEditClick, children} = props
    const {logout} = useLogout()
    const {user} = useAuthContext()
    return (
        <div className='fixed w-full flex flex-col bg-blue-100 gap-y-4 items-center justify-around py-4 px-10 md:gap-x-4 md:flex-row md:px-24'>
            <div className="w-full flex justify-between">
                <div className="text-4xl font-mono w-full font-bold md:w-auto md:text-5xl">
                    {headerTitle}
                </div>
                <div className="block sm:hidden text-gray-300 text-xl h-10 flex items-center justify-center">
                        |
                </div>
                <div 
                    className="block cursor-default w-9 h-9 flex items-center justify-center md:hidden" 
                    onClick={onEditClick}
                >
                    <HiPencil size='24px' className='text-gray-300 hover:text-gray-400'/>
                </div>
            </div>
            <div className="h-full flex flex-col w-full gap-y-4 md:flex-row md:gap-x-4 md:items-center">
                <div className='h-10 w-full flex items:start'>
                    <input 
                        className='px-3 h-10 w-full bg-transparent focus:outline-none border-b border-solid border-gray-400 focus:border-blue-500'
                        placeholder="Search notes.." 
                        value={noteTitle} 
                        onChange={e=>onTitleChange(e.target.value)}
                    />
                    <div className="text-gray-300 text-xl h-10 flex items-center justify-center">
                        |
                    </div>
                    <div className="text-gray-300 text-3xl w-9 h-10 flex items-center justify-center hover:text-gray-500 hover:cursor-default">
                        <Link to='/new' className='hover:cursor-default'>
                            +
                        </Link>
                    </div>
                    
                </div>
                <ReactSelect
                    styles={{
                        container:(baseStyles, state) => ({
                            ...baseStyles,
                            width:'100%',
                            height:'50%',
                            
                        }),
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
                            onTagChange(tags.map(tag=>{
                                return {label:tag.label, id:tag.value}
                            }))
                        }
                    }
                    placeholder='Select Tags...'
                />
                <div className="hidden cursor-default w-9 h-9 flex items-center justify-center md:flex" onClick={onEditClick}>
                    <HiPencil size='24px' className='text-gray-300 hover:text-gray-400'/>
                </div>
                <div className='hidden gap-x-4 md:flex'>
                    {
                        user && <button onClick={logout}>Logout from {user.email}</button>
                    }
                    {
                        !user && (
                            <>
                                <Link to='/login'>Login</Link>
                                <Link to='/register'>Register</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}