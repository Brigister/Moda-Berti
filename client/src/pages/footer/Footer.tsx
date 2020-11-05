import React from 'react';
import { Divider, Grid, Hidden } from '@material-ui/core';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PhoneIcon from '@material-ui/icons/Phone';
import MapIcon from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';

import styles from './footer.module.css';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer>
            <Grid container justify="center" className={styles.container}>
                <Grid
                    item
                    container
                    xs={12}
                    sm={3}
                    justify="center"
                    alignItems="center"
                    direction="column"
                >
                    <Grid item xs={4}>
                        <h3>Prodotti</h3>
                    </Grid>
                    <Grid item container justify="center" alignItems="center">
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=woman" }}>
                                Donna
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=woman-luxory" }}>
                                Donna Luxory
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=woman-underwear" }}>
                                Donna Intimo
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=man" }}>
                                Uomo
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=man-luxory" }}>
                                Uomo Luxory
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=man-underwear" }}>
                                Uomo Intimo
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=bambina" }}>
                                Bambina
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=bambino" }}>
                                Bambino
                        </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className={styles.link} to={{ pathname: "/shop/products", search: "?gender=neonato" }}>
                                Neonato
                        </Link>
                        </Grid>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem classes={{ root: styles.divider }} />
                <Hidden smUp>
                    <Divider classes={{ root: styles.divider }} />
                </Hidden>
                <Grid
                    item
                    container
                    xs={12}
                    sm={3}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>
                        <h3>Contatti</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <PhoneIcon fontSize="small" />
                        <a href="tel:+39041921705" className={styles.link}>041921705</a>
                    </Grid>
                    <Grid item xs={12}>
                        <EmailIcon fontSize="small" />
                        <a href="mailto:info@modaberti.it" className={styles.link}>info@modaberti.it</a>
                    </Grid>
                    <Grid item xs={12}>
                        <p className={styles.text}>Via Cesare Beccaria 111 - Marghera VE</p>
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem classes={{ root: styles.divider }} />
                <Hidden smUp>
                    <Divider classes={{ root: styles.divider }} />
                </Hidden>

                {/* Social */}
                <Grid
                    item
                    container
                    xs={12}
                    sm={3}
                    direction="column"
                    alignItems="center"
                    justify="center" >
                    <Grid item xs={3}>
                        <h3>Social</h3>
                    </Grid>
                    <Grid item xs={3}>
                        <a href="https://www.facebook.com/ModaBerti" >
                            <FacebookIcon fontSize="large" className={styles.link} />
                        </a>
                    </Grid>
                    <Grid item xs={3}>
                        <a href="https://www.instagram.com/modabertimarghera" >
                            <InstagramIcon fontSize="large" className={styles.link} />
                        </a>
                    </Grid>

                </Grid>

                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Divider classes={{ root: styles.divider }} />
                    </Grid>
                    <Grid item container justify="center" sm={4}>
                        <Grid item>
                            <p className={styles.text}>Moda Berti s.a.s di Tuzzato Monica & C</p>
                        </Grid>
                        <Grid item>
                            <p className={styles.text}>P.I. 0123456789 </p>
                        </Grid>
                        <Grid item>
                            <p className={styles.text}>Powered by Byteman</p>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </footer >
    )
}