import React from 'react'

import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

export const Settings: React.FC = () => {
    return (
        <div>
            <h2>Settings</h2>

            <Link to="/userPanel/settings/changePassword">
                <Button variant="contained" color="primary">Cambia Password</Button>
            </Link>
        </div>
    )
}
