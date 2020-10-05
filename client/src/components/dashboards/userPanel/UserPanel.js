import React from 'react';
import { Link } from 'react-router-dom';


import { Card, CardHeader, CardContent } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import styles from './userPanel.module.css';

export const UserPanel = () => {

    const id = 2;

    return (
        <>
            <h2>{id}</h2>
            <div className={styles.container}>
                <Link to={`/userPanel/orderList`}>
                    <Card raised="true" className={styles.card}>

                        <CardHeader title="Ordini" />
                    </Card>
                </Link>
                <Link to={`/cart`}>
                    <Card raised="true" className={styles.card}>

                        <CardHeader title="Carrello" />
                        <CardContent className={styles.cardContent}>
                            <ShoppingCartIcon style={{ fontSize: 150, color: "gray" }} />
                        </CardContent>
                    </Card>
                </Link>
                <Link to={`/userPanel/settings`}>
                    <Card raised="true" className={styles.card}>

                        <CardHeader title="Impostazioni" />
                        <CardContent className={styles.cardContent}>
                            <SettingsIcon style={{ fontSize: 150, color: "gray" }} />
                        </CardContent>



                    </Card>
                </Link>
            </div>
        </>
    )
}
