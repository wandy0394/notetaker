import {useState, FormEvent} from 'react'
import Translator from "../../api/translation-service"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import languages from "../../languages.json"

export default function TranslationForm() {
    const [sourceText, setSourceText] = useState<string>('')
    const [targetLang, setTargetLang] = useState<string>('en')
    const [sourceLang, setSourceLang] = useState<string>('en')
    const [translatedText, setTranslatedText] = useState<string>('')
    
    function handleTranslate(e: FormEvent) {
        e.preventDefault()
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
        <div className='flex flex-col gap-y-4'>
            <input className='px-4' placeholder='What do you want to translate..?' value={sourceText} onChange={(e)=>setSourceText(e.target.value)}></input>
            <input className='px-4' placeholder='...' value={translatedText} disabled></input>
            <div className='flex items-end justify-between gap-x-4 w-full'>
                <div className='flex flex-col items-start gap-x-2'>
                    <p className='text-xs'>Translate from:</p>
                    <select className='bg-transparent rounded' onChange={(e)=>setSourceLang(e.target.value)}>
                        {
                            Object.entries(languages).map(([code, name])=>{
                                    return <option selected={code==='en'?true:false} value={code} label={name}></option>
                                })
                            }

                    </select>
                </div>
                <div className='flex flex-col items-start gap-x-2'>
                    <p className='text-xs'>To:</p>
                    <select className='bg-transparent rounded' onChange={(e)=>setTargetLang(e.target.value)}>
                        {
                            Object.entries(languages).map(([code, name])=>{
                                return <option value={code} label={name}></option>
                                })
                            }

                    </select>
                </div>
                <button 
                    onClick={handleTranslate} 
                    className='px-2 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-400'
                >
                    Go
                </button> 
            </div>
        </div>
)
}