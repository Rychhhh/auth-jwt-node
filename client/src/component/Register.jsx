import { useState } from "react"
import { useHistory } from 'react-router-dom';

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const history = useHistory();


    async function registerForm(event) {


        event.preventDefault();

        const response = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })

        const body = await response.json();

        console.log(body)

        if(body.status === 'ok') {
            history.push('/login')
        }
    }

    return (
        <div className="flex justify-center h-screen items-center bg-emerald-500">

            <div className="bg-sky-400 rounded-xl">

                <form onSubmit={registerForm} className="flex flex-col w-[400px] p-[50px]">

                    <input type="text"
                    value={name}
                    onChange={(event) => {setName(event.target.value)}}
                    placeholder='enter name'
                    className="p-3 mb-4 rounded-xl outline-none" />

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

                <div className="text-center mx-[100px] items-center flex flex-wrap">
                    <p className="mr-2 font-medium">Have account </p>
                    <button onClick={() => history.push('/login')} className="text-center items-center justify-center my-10 font-bold">Login</button>
                </div>

            </div>

        </div>
    )
}
