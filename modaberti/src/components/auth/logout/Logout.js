import React from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'

import { logout } from '../../../redux/AuthReducer'


export const Logout = () => {
    const dispatch = useDispatch()

    return (
        <Button onClick={() => dispatch(logout())}>Logout</Button>
    )
}
