import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


import { Card, CardHeader, CardContent } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import styles from './userPanel.module.css';
import { UserContext } from '../../../context/UserContext';
import { LoggedUser } from '../../../interfaces/interfaces';
import { Storage, ShoppingCart, Settings } from '@material-ui/icons';

export const UserPanel: React.FC = () => {
    const { userId }: LoggedUser = useContext(UserContext);

    return (
        <>
            <h2>{userId}</h2>
            <div className={styles.container}>
                <Link to={`/userPanel/orderList`}>
                    <Card raised className={styles.card}>
                        <CardHeader title="Ordini" />
                        <CardContent className={styles.cardContent}>
                            <Storage style={{ fontSize: 150, color: "gray" }} />
                        </CardContent>
                    </Card>
                </Link>
                <Link to={`/cart`}>
                    <Card raised className={styles.card}>
                        <CardHeader title="Carrello" />
                        <CardContent className={styles.cardContent}>
                            <ShoppingCart style={{ fontSize: 150, color: "gray" }} />
                        </CardContent>
                    </Card>
                </Link>
                <Link to={`/userPanel/settings`}>
                    <Card raised className={styles.card}>
                        <CardHeader title="Impostazioni" />
                        <CardContent className={styles.cardContent}>
                            <Settings style={{ fontSize: 150, color: "gray" }} />
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </>
    )
}
