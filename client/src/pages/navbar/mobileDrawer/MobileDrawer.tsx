import { Drawer, Grid } from '@material-ui/core'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { LoggedUser, MobileDrawerProps } from '../../../interfaces/interfaces'
import { Logout } from '../../auth/logout/Logout';

import styles from './mobileDrawer.module.css';

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ openMobile, setOpenMobile }) => {
    const { user }: { user: LoggedUser } = useContext(UserContext);
    const { isLoggedIn, isAdmin } = user;
    return (
        <Drawer
            open={openMobile}
            anchor="right"
            classes={{ root: styles.container }}
        >

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
        </Drawer>
    )
}
