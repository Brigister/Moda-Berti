import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@material-ui/core';

import styles from './shopitem.module.css'



export const ShopItem = (props) => {


    const { id, name, brand, image_url, price } = props.product


    return (

        <Link to={`shop/product/${id}`}>
            <Card raised className={styles.item} >
                <CardHeader
                    title={name}
                    subheader={brand}
                />
                <div style={{ width: "50%" }}>
                    <img src={`http://localhost:4000/${image_url}`} alt={name} />
                </div>
                <CardContent>
                    <p>{price ? `${price / 100}€` : "prezzo non disponibile"}</p>
                </CardContent>
            </Card >
        </Link>

    )
}