import React from 'react'

import { Card, CardActionArea, CardMedia, Container, Grid, } from '@material-ui/core'

import { Link } from 'react-router-dom';

import styles from './shop.module.css';

export function Shop() {
    return (
        <Container maxWidth="sm" className={styles.container}>
            <Grid container cols={2} spacing={10} justify="center" align="center">
                <Grid item xs={6} className={styles.simbolo}>
                    <Card raised>
                        <Link to={'/shop/shoplist'}>
                            <img className={styles.simbolo} src={require("./simbolo_donna.png")} alt="Donna"></img>
                        </Link >
                    </Card>
                </Grid>
                <Grid item xs={6} className={styles.simbolo}>
                    <Card raised>
                        <CardActionArea>
                            <img className={styles.simbolo} src={require("./simbolo_uomo.png")} alt="Uomo"></img>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={6} className={styles.simbolo}>
                    <Card raised>
                        <CardActionArea>
                            <img className={styles.simbolo} src={require("./simbolo_intimo.jpg")} alt="Intimo"></img>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={6} className={styles.simbolo}>
                    <Card raised>
                        <CardActionArea>
                            <img className={styles.simbolo} src={require("./simbolo_bambino.png")} alt="Bambino"></img>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid >
        </Container >
    )
}
