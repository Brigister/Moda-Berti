import React from 'react'

import styles from './itemDetails.module.css'

interface ProductDescriptionProps {
    description: string
}
export const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    return (
        <li className={styles.description}>{description}</li>
    )
}
