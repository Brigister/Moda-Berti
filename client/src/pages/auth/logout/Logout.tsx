import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { UserContext } from '../../../context/UserContext'
import { useMutation } from 'react-query'
import api from '../../../api/axiosIstance'

export const Logout = () => {
    const { setUser } = useContext(UserContext)
    const history = useHistory();

    const [logoutUser] = useMutation(async () => {
        const res = await api.post('auth/logout');
        return res.data;
    }, {
        onSuccess: ({ success }: { success: boolean }) => {
            if (success) {
                setUser({
                    token: '',
                    userId: undefined,
                    isLoggedIn: false,
                    isAdmin: false
                });
                history.push('/login');
            }
        }
    }
    );
    const handleLogout = async () => {
        const response = await logoutUser();
        console.log('logout', response)
    }
    return (
        <Button onClick={handleLogout}>Logout</Button>
    )
}
