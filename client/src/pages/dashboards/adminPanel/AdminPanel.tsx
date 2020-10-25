import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminSidebar } from './adminSidebar/AdminSidebar'
import { ManageOrders } from './manageOrders/ManageOrders'
import { ManageProducts } from './manageProducts/ManageProducts'
import { ManageUsers } from './manageUsers/ManageUsers'

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
                <Route exact path="/adminPanel/products" component={ManageProducts} />
                <Route exact path="/adminPanel/orders" component={ManageOrders} />
                <Route exact path="/adminPanel/users" component={ManageUsers} />


            </Switch>
        </div>
    )
}
