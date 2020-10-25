import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardMedia } from '@material-ui/core';

import styles from './shopitem.module.css'
import { Product } from '../../../interfaces/interfaces';
import { priceFormatter } from '../../../utils/priceFormatter';

export const ShopItem: React.FC<Product> = ({
    id,
    name,
    brand,
    image_url,
    price
}) => {
    return (
        <Link to={`product/${id}`}>
            <Card raised classes={{ root: styles.item }} >

                <CardHeader
                    title={name}
                    subheader={brand}
                />

                <CardMedia
                    className={styles.card_image}
                    component="img"
                    title={name}
                    src={`http://localhost:4000/${image_url}`}
                />

                <CardContent classes={{ root: styles.price }}>
                    <p><strong>{price ? `${priceFormatter(price)}€` : "Prezzo non disponibile"}</strong></p>
                </CardContent>

            </Card >
        </Link>

    )
}