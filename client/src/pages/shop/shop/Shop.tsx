import React from 'react'

import { Card, CardActionArea, CardHeader, CardMedia, Container, Grid, } from '@material-ui/core'

import { Link } from 'react-router-dom';

import styles from './shop.module.css';
import { TypeCard } from './TypeCard';

export const Shop: React.FC = () => {
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={10} justify="center">
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman"
                        image={require("../../../assets/gender/simbolo_donna.png")}
                    />

                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman-Luxory"
                        image={require("../../../assets/gender/simbolo_donna.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman-Lingerie"
                        image={require("../../../assets/gender/simbolo_donna.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man"
                        image={require("../../../assets/gender/simbolo_uomo.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man-Luxory"
                        image={require("../../../assets/gender/simbolo_uomo.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man-intimo"
                        image={require("../../../assets/gender/simbolo_uomo.png")}
                    />
                </Grid>

                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Bambina"
                        image={require("../../../assets/gender/simbolo_bambino.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Bambino"
                        image={require("../../../assets/gender/simbolo_bambino.png")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Neonato"
                        image={require("../../../assets/gender/simbolo_bambino.png")}
                    />
                </Grid>
            </Grid >
        </Container >
    )
}
