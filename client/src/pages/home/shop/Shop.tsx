import React from 'react'
import { Container, Grid, } from '@material-ui/core'
import styles from './shop.module.css';
import { TypeCard } from './TypeCard';

export const Shop: React.FC = () => {
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={2} justify="center">
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman"
                        image={require("../../../assets/gender/DONNA.jpeg")}
                    />

                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman-Luxory"
                        image={require("../../../assets/gender/DONNA_LUXORY.jpeg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Woman-Lingerie"
                        image={require("../../../assets/gender/DONNA_UNDERWEAR.jpg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man"
                        image={require("../../../assets/gender/UOMO.jpg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man-Luxory"
                        image={require("../../../assets/gender/UOMO_LUXORY.jpg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Man-intimo"
                        image={require("../../../assets/gender/UOMO_UNDERWEAR.jpeg")}
                    />
                </Grid>

                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Bambina"
                        image={require("../../../assets/gender/BAMBINA.jpg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Bambino"
                        image={require("../../../assets/gender/BAMBINO.jpg")}
                    />
                </Grid>
                <Grid item lg={4} xs={12} className={styles.simbolo}>
                    <TypeCard
                        title="Neonato"
                        image={require("../../../assets/gender/NEONATO.jpeg")}
                    />
                </Grid>
            </Grid >
        </Container >
    )
}
