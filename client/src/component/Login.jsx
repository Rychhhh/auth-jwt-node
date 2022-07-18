import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function loginForm(event) { 
        event.preventDefault();

        const response = await fetch('http://localhost:1337/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const body = await response.json();
        
        console.log(body);
    }

    return (
        <div className="flex justify-center h-screen items-center bg-emerald-500">

            <div className="bg-sky-400 rounded-xl">
              
                <form onSubmit={loginForm} className="flex flex-col w-[400px] p-[50px]">

                    <input type="email"
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                    placeholder='enter email'
                    className="p-3 mb-4 rounded-xl outline-none" />

                    <input type="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    placeholder='enter password'
                    className="p-3 mb-4 rounded-xl outline-none" />

                    <input type="submit" value="Register" className="px-6 py-3 bg-green-500 rounded-xl font-bold text-xl hover:opacity-75" />

                </form>
                
            </div>
            
        </div>
    )
}
