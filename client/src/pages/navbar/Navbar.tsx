import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Button, Hidden } from '@material-ui/core';

import styles from './navbar.module.css';
import { Logout } from '../auth/logout/Logout';
import { UserContext } from '../../context/UserContext';
import { LoggedUser, MobileDrawerProps } from '../../interfaces/interfaces';
import { MobileNavBar } from './mobileNavbar/MobileNavBar';


export const Navbar: React.FC<MobileDrawerProps> = ({ openMobile, setOpenMobile }) => {
    const { user }: { user: LoggedUser } = useContext(UserContext);
    const { isLoggedIn, isAdmin } = user;

    return (
        <AppBar position="sticky" style={{ zIndex: 1201 }}>
            <Toolbar className={styles.container} >
                <Link to='/' className={styles.links}>
                    <img src={require('../../assets/logo.png')} alt="Logo Moda Berti" className={styles.logo}></img>
                </Link>
                <Hidden smDown>
                    <ul className={styles.routes}>
                        <li className={styles.route}>
                            <NavLink to="/about" activeClassName={styles.active} className={styles.links}>Chi siamo</NavLink>
                        </li>
                        <li className={styles.route}>
                            <NavLink to="/brands" activeClassName={styles.active} className={styles.links}>Brands</NavLink>
                        </li>

                        {isLoggedIn
                            ?
                            isAdmin
                                ?
                                <li className={styles.route}>
                                    <NavLink to="/adminPanel" activeClassName={styles.active} className={styles.links}>Admin</NavLink>
                                </li>
                                :
                                <li className={styles.route}>
                                    <NavLink to="/userPanel" activeClassName={styles.active} className={styles.links}>User</NavLink>
                                </li>
                            :
                            <></>
                        }
                        {isLoggedIn ?
                            <>
                                <li className={styles.route}>
                                    <NavLink to="/cart" activeClassName={styles.active} className={styles.links} >{/* <ShoppingCartIcon /> */}Carrello</NavLink>
                                </li>
                                <li className={styles.route}>
                                    <Logout />
                                </li>
                            </>
                            :
                            <>
                                <li className={styles.route}>
                                    <NavLink to="/login" activeClassName={styles.active} className={styles.links}>Login</NavLink>
                                </li>
                                <li className={styles.route}>
                                    <NavLink to="/signup" activeClassName={styles.active} className={styles.links}>Registrati</NavLink>
                                </li>
                            </>
                        }

                    </ul>
                </Hidden>

                <Hidden mdUp>
                    <MobileNavBar openMobile={openMobile} setOpenMobile={setOpenMobile} />
                </Hidden>
            </Toolbar>
        </AppBar>

    )
}
