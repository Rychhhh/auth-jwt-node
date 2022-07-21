import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useState } from 'react';

const Dashboard = () => {

    const [kutipan, setKutipan] = useState('')
    const [inputKutipan, setInputKutipan] = useState('')

    const history = useHistory();

    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json();

        if(data.status === 'ok') {
            setKutipan(data.kutipan) // menyimpan data kutipan didalam api
        } else{
            alert(data.error)
        }
    }

    const logout = (e) => {
        e.preventDefault()

        localStorage.clear()

        history.push('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt_decode(token)

            if(!user) {
                history.push('/login')
            } else {
                populateQuote()
            }

        } else {
            history.push('/login')
        }

        console.log(kutipan)
    }, [])


    async function updateQuote(event) {
        event.preventDefault();

        const req = await fetch('http://localhost:1337/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                kutipan: inputKutipan
            })
        })


        const data = await req.json();

        // jika status 'ok' maka passing data nya
        if(data.status === 'ok')  {
            //set kutipan menjadi value yang ada di input
            setKutipan(inputKutipan)
            setInputKutipan('') //
        } else {
            alert(data.error)
        }

    }

    return(
        <h1 className="text-center items-center justify-center">
            Your Quote : <p>{kutipan || 'Tidak Ada Kutipan'}</p>
            Hello Visitor

            <br />
            <button className='py-2 px-5 bg-red-500 my-3 font-bold rounded-md text-white' onClick={logout}>Logout</button>

            <form onSubmit={updateQuote}>
                <input
                 type="string"
                 className="border-1 outline-1"
                 placeholder='Enter Your Kutipan...'
                 value={inputKutipan}
                 onChange={(e) => setInputKutipan(e.target.value)} />

                 <input type="submit" value="Submit Kutipan" />
            </form>
        </h1>
    )

}

export default Dashboard;