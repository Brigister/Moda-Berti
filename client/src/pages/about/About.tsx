import React from 'react'
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core'
import { Carousel } from './Carousel'




export const About: React.FC = () => {


    return (

        <Grid container spacing={6} justify="center" alignItems="center" style={{ margin: "auto" }}>
            <Grid item xs={12} md={5} >
                <Card raised>
                    <CardHeader title="La nostra storia" style={{ textAlign: "center" }} />
                    <CardContent>
                        <p>Negozio di Abbigliamento uomo, donna e bambino fondato nel 1954 a Marghera
                        da Berti Maria gestito, ad oggi, dalla figlia Monica.
                        Il negozio si trova in via Beccaria 111, a 3 min dall'area commerciale di Marghera
                        e propone un vasto assortimento di vestiti uomo, donna e bambino per tutte le tasche. </p>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={5}>
                <img src={require('../../assets/storia.jpeg')} alt="Immagine storica del negozio" style={{ borderRadius: 5 }} />
            </Grid>
            <Grid item xs={12} md={5}>
                <Carousel />
            </Grid>
            <Grid item xs={12} md={5}>
                <iframe
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJlQ4Yf5C2fkcRHUsZpeRYfsw&key=AIzaSyATBBZeMtAIbTaTAOgWxQ6JF_wBxcE1vWY"
                ></iframe>
            </Grid>

        </Grid>




    )
}
