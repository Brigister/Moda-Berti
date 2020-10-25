import React from 'react'
import { BrandCard } from './BrandCars'
import { Grid } from '@material-ui/core'

import styles from './brands.module.css'


export const Brands: React.FC = () => {
    return (
        <Grid
            className={styles.container}
            container
            justify="center"
            spacing={5}
        >
            <BrandCard
                title="Artigli"
                image={require("../../assets/brands/artigli.jpg")}
                url="https://www.artiglishop.com/"
            />
            <BrandCard
                title="Edas"
                image={require("../../assets/brands/edas.jpg")}
                url="https://www.edasitalia.it/"
            />
            <BrandCard
                title="J'aime"
                image={require("../../assets/brands/jaime.jpg")}
                url="https://www.jaimefashionstyle.it/it/"
            />
            <BrandCard
                title="Joana"
                image={require("../../assets/brands/joana.png")}
                url="https://www.joana.clothing/"
            />
            <BrandCard
                title="Luisa Viola"
                image={require("../../assets/brands/luisaviola.jpg")}
                url="http://luisaviola.it/"
            />
            <BrandCard
                title="Lattementa"
                image={require("../../assets/brands/lattementa.jpg")}
                url="https://www.facebook.com/lattementabologna"
            />

            <BrandCard
                title="Gaudì"
                image={require("../../assets/brands/gaudì.jpg")}
                url="https://gaudi-fashion.com/it_it/"
            />
            <BrandCard
                title="Notting Hill"
                image={require("../../assets/brands/nottinghill.jpg")}
                url="https://nottinghill.it/"
            />
            <BrandCard
                title="Markup"
                image={require("../../assets/brands/markup.png")}
                url="https://www.markupitalia.com/"
            />
            <BrandCard
                title="Pyrex"
                image={require("../../assets/brands/pyrex.jpeg")}
                url="https://www.pyrexoriginal.com/it/"
            />
            <BrandCard
                title="Y-Clù"
                image={require("../../assets/brands/y-clu.png")}
                url="http://www.yclu.it/"
            />
        </Grid>
    )
}
