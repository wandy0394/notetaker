import {useState, FormEvent} from 'react'
import {Link} from 'react-router-dom'
import Authenticator from '../../api/authentication-service'
import { useRegister
 } from '../../hooks/useRegister'
export default function Register() {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {register, error, isLoading} = useRegister()

    async function handleSubmit(e:FormEvent) {
        e.preventDefault()
        console.log(email, password)
        const response = await register(email, password, name)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center justify-center w-1/2'>
            <h3>Register</h3>
            <div className='flex flex-col gap-y-2'>
                <label>Name:</label>
                <input
                    className='w-full'
                    type='text'
                    onChange = {(e)=>setName(e.target.value)}
                    value={name}
                />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Email:</label>
                <input
                    className='w-full'
                    type='email'
                    onChange = {(e)=>setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div className='flex flex-col gap-y-2'>
                <label>Password:</label>
                <input
                    className='w-full'
                    type='password'
                    onChange = {(e)=>setPassword(e.target.value)}
                    value={password}
                />
            </div>
            <div className='flex gap-x-8 items-center justify-center'>
                <button disabled={isLoading as boolean} type='submit'>Register</button>
                <Link to='..' >Go Back</Link>
            </div>
            {error}
        </form>
    )
}