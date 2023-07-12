import { useContext, useState } from "react"
import { Link, Navigate, Outlet} from "react-router-dom"
import axios from "axios"

import { UserContext } from "../UserContext"
import { HouseIcon, ListIcon, UserIcon } from "../components/Icons"

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null)
    const [subpage, setSubpage] = useState('profile')
    const {ready, user, setUser} = useContext(UserContext)

    async function logout() {
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)
    }

    function linkClassed (type=null) {
        let classes = 'inline-flex py-2 px-6  rounded-full'
        if(type === subpage) {
            classes += ' bg-primary text-white'
        } else {
            classes += ' bg-gray-200'
        }
        return classes
    }

    if(!ready) {
        return 'Loading...'
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect}/>
    }

    return (
        <div>
            <nav className="w-full gap-2 flex justify-center mt-4">
                <Link className={linkClassed('profile')} onClick={() => setSubpage('profile')} to={'/account/profile'} >
                    <UserIcon />
                    My profile
                </Link>
                <Link className={linkClassed('bookings')} onClick={() => setSubpage('bookings')} to={'/account/bookings'}>
                    <ListIcon />
                    My bookings
                </Link>
                <Link className={linkClassed('places')} onClick={() =>setSubpage('places')} to={'/account/places'}>
                    <HouseIcon />
                    My accommodations
                </Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.email}
                    <button onClick={logout} className="primary max-w-md mt-2" >Logout</button>
                </div>
            )}
            <Outlet />
        </div>
    )
}