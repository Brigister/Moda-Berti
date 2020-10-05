import React from 'react'

import styles from './itemDetails.module.css'

export const ProductDescription = ({ description }) => {
    return (
        <li className={styles.description}>{description}</li>
    )
}
