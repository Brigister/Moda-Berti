import path from 'path'
import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminSidebar } from './adminSidebar/AdminSidebar'
import { ManageProducts } from './manageProducts/ManageProducts'

export const AdminPanel: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };


    return (
        <div style={open ? { marginLeft: "10%" } : { marginLeft: "5%" }}>
            <h3>Pannello Admin</h3>
            <AdminSidebar open={open} handleDrawer={handleDrawer} />


            <Switch>
                <Route exact path="/adminPanel">

                </Route>
                <Route path="/adminPanel/products" component={ManageProducts} />
            </Switch>
        </div>
    )
}
