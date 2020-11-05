import React, { useState } from 'react'
import { MobileDrawerProps } from '../../../interfaces/interfaces';

import styles from './mobileNavbar.module.css';

export const MobileNavBar: React.FC<MobileDrawerProps> = ({ openMobile, setOpenMobile }) => {

    const className = openMobile ? `${styles.icon} ${styles.open}` : `${styles.icon}`
    console.log(openMobile)
    return (
        <div className={className} onClick={() => setOpenMobile()}>
            <span />
            <span />
            <span />
        </div>
    )
}
