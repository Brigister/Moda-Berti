import React from 'react'
import { Drawer, List, ListItem, ListItemText, } from '@material-ui/core'
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom'
import { ManageProducts } from '../manageProducts/ManageProducts';

export const AdminSidebar = () => {
    let { path, url } = useRouteMatch();
    console.log(url);
    return (
        <>
            <List>
                <ListItem>
                    <ListItemText >
                        <Link to={`${url}/products`}>Prodotti</Link>
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText >
                        {/*   <Link>Utenti</Link> */}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemText >
                        {/*   <Link>Ordini</Link> */}
                    </ListItemText>
                </ListItem>
            </List>

            <Switch>
                <Route exact path={path}>
                    <h3>Pannello Admin</h3>
                </Route>
                <Route path={`${path}/products`}>
                    <ManageProducts />
                </Route>
            </Switch>
        </>

    )
}
