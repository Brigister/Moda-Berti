import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Button } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import styles from './navbar.module.css';
import { Logout } from '../auth/logout/Logout';
import { UserContext } from '../../context/UserContext';
import { LoggedUser } from '../../interfaces/interfaces';


export const Navbar: React.FC = () => {
    const { user }: { user: LoggedUser } = useContext(UserContext);
    const { isLoggedIn, isAdmin } = user;

    return (
        <AppBar position="sticky" style={{ zIndex: 1201 }}>
            <Toolbar className={styles.container} >
                <Link to='/' className={styles.links}>
                    <h3>Moda Berti - L'imbarazzo della scelta</h3>
                </Link>

                <ul className={styles.routes}>
                    <li className={styles.route}>
                        <NavLink to="/about" activeClassName={styles.active} className={styles.links}>Chi siamo</NavLink>
                    </li>
                    <li className={styles.route}>
                        <NavLink to="/brands" activeClassName={styles.active} className={styles.links}>Brand</NavLink>
                    </li>

                    {isLoggedIn
                        ?
                        isAdmin
                            ?
                            <>
                                <li className={styles.route}>
                                    <NavLink to="/cart" activeClassName={styles.active} className={styles.links} >{/* <ShoppingCartIcon /> */}Carello</NavLink>
                                </li>
                                <li className={styles.route}>
                                    <NavLink to="/adminPanel" activeClassName={styles.active} className={styles.links}>Admin Panel</NavLink>
                                </li>
                            </>
                            :
                            <li className={styles.route}>
                                <NavLink to="/userPanel" activeClassName={styles.active} className={styles.links}>User Panel</NavLink>
                            </li>
                        :
                        <></>
                    }
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
