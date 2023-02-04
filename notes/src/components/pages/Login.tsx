import {useState, FormEvent} from 'react'
import {Link} from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')


    async function handleSubmit(e:FormEvent) {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 items-center justify-center w-1/2'>
            <h3>Log in</h3>
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
                <button type='submit'>Login</button>
                <Link to='..' >Go Back</Link>
            </div>
        </form>
    )
}