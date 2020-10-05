import React from 'react'
import { Paper } from '@material-ui/core';

import styles from './orderProduct.module.css';

export const OrderProduct = ({ product }) => {
    return (
        <Paper elevation={0} variant="outlined" className={styles.productPaper}>
            <img src={`http://localhost:4000/${product.imageUrl}`} alt={product.name} width="100px" />
            <div className={styles.productDetails}>

                <h3>{product.name}</h3>
                <p><strong>{`Taglia: ${product.size}`}</strong></p>
                <p>{`Prezzo: ${product.price / 100}€`}</p>
            </div>
        </Paper>
    )
}
