import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Button, IconButton } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import styles from './navbar.module.css';
import { Logout } from '../auth/logout/Logout';
import { loggedUser } from '../../redux/AuthReducer';


export const Navbar = () => {
    const { isAdmin, isLoggedIn } = useSelector(loggedUser)
    return (
        <AppBar position="sticky">
            <Toolbar className={styles.container} >

                <ul className={styles.routes}>
                    <li className={styles.route}>
                        <NavLink to="/shop" activeClassName={styles.active} className={styles.links}>Shop</NavLink>
                    </li>
                    <li className={styles.route}>
                        <NavLink to="/about" activeClassName={styles.active} className={styles.links}>Storia</NavLink>
                    </li>
                    <li className={styles.route}>
                        <NavLink to="/topics" activeClassName={styles.active} className={styles.links}>Storia</NavLink>
                    </li>
                </ul>

                <Button variant="contained" color="secondary" className={styles.logo}>
                    <NavLink to="/" className={styles.links}>Moda Berti</NavLink>
                </Button>

                <ul className={styles.users}>
                    <li className={styles.route}>
                        <NavLink to="/cart" activeClassName={styles.active} className={styles.links} ><ShoppingCartIcon /></NavLink>
                    </li>
                    {isLoggedIn && isAdmin ?
                        <li className={styles.route}>
                            <NavLink to="/adminPanel" activeClassName={styles.active} className={styles.links}>Admin Panel</NavLink>
                        </li>

                        : <></>}
                    {isLoggedIn ?
                        <li className={styles.route}>
                            <Logout />
                        </li>
                        :
                        <>
                            <li className={styles.route}>
                                <NavLink to="/login" activeClassName={styles.active} className={styles.links}>Login</NavLink>
                            </li>
                            <li className={styles.route}>
                                <NavLink to="signup" activeClassName={styles.active} className={styles.links}>Registrati</NavLink>
                            </li>
                        </>
                    }

                </ul>

            </Toolbar>
        </AppBar>

    )
}
