import router, { useRouter } from "next/router"

export function LogoutButton(props){
    const handleLogout = () => {
        if( localStorage ) {
            localStorage.removeItem('token')
            router.push('/login')
        }
    }

    return (
        <div className="float-end">
            <button onClick={handleLogout} className="btn btn-secondary">
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