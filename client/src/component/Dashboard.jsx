import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import jwt_decode from "jwt-decode";

const Dashboard = () => {

    const history = useHistory();

    async function populateQuote() {
        const req = await fetch('http://localhost:1337/api/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })

        const data = await req.json();

        console.log(data);

    }

    const logout = (e) => {
        e.preventDefault();

        console.log('Logout')

        localStorage.clear();

        history.push('/login')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            const user = jwt_decode(token)

            console.log(user)

            if(!user) {
                history.push('/login')
            } else {
                populateQuote()
            }

        } else {
            history.push('/login')
        }
    }, [])

    return(
        <h1 className="text-center items-center justify-center">
            Your Quote : <p></p>
            Hello Visitor

            <br />
            <button onClick={logout}>Logout</button>
        </h1>
    )

}

export default Dashboard;