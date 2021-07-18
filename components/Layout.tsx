import router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import jwt from 'jsonwebtoken'

export function LogoutButton(props) {
    const [usuario, setUsuario] = useState({exp:0, iat: 0, usuario: ''})
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if( localStorage && !loaded ) {
            const token = localStorage.getItem('token')
            const payload:any = jwt.decode(token, {json: true})
            setUsuario( payload )
            console.dir( payload )
            setLoaded(true)
        }
    })

    const handleLogout = () => {
        if( localStorage ) {
            localStorage.removeItem('token')
            router.push('/login')
        }
    }

    return (
        <div className="float-end">
            <span className="me-2 text-secondary">
                <small>
                    {usuario.usuario}
                </small>                
            </span> 
            <button onClick={handleLogout} className="btn btn-danger">
                Logout
            </button>
        </div>
    )
}

export function Layout(props) {
    const router = useRouter()

    return (
        <div className="container bg-light py-5 px-5 rounded-3">

            <LogoutButton />

            {props.children}
        </div>
    )
}