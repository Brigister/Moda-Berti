import React from 'react'
import { Paper } from '@material-ui/core';

import styles from './orderProduct.module.css';
import { OrderProduct as OrderProductProps } from '../../../../interfaces/interfaces';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../../../utils/priceFormatter';

export const OrderProduct: React.FC<OrderProductProps> = ({
    product_id,
    name,
    size,
    price,
    image_url
}) => {
    return (
        <Paper elevation={2} variant="outlined" className={styles.productPaper}>
            <Link to={`/shop/product/${product_id}`}>
                <img src={`http://localhost:4000/${image_url}`} alt={name} width="100px" />
            </Link>
            <div className={styles.productDetails}>

                <h3>{name}</h3>
                <p><strong>{`Taglia: ${size}`}</strong></p>
                <p>{`Prezzo: ${priceFormatter(price)}€`}</p>
            </div>
        </Paper >
    )
}
