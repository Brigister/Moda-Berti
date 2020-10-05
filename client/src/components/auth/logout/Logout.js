import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { UserContext } from '../../../context/UserContext'

export const Logout = () => {
    const { setUser } = useContext(UserContext)
    const history = useHistory();

    const logoutUser = () => {
        setUser({
            token: '',
            isLoggedIn: false,
            isAdmin: false
        })
        history.push('/login');
    }
    return (
        <Button onClick={logoutUser}>Logout</Button>
    )
}
