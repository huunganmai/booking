import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import axios from 'axios'

export const UserContext = createContext({})

function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
                setReady(true)
           })
        }
    }, [])
    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}}>
            {children} 
        </UserContext.Provider>
    )
}

UserContextProvider.propTypes = {
    children: PropTypes.element,
}

export {UserContextProvider}