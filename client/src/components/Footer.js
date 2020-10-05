import React from 'react';
import { Grid } from '@material-ui/core';

export const Footer = () => {
    return (
        <footer s>
            <Grid container >
                <Grid item container>
                    <Grid item xs={8}>
                        <p> Moda Berti srl di Tuzzato Monica  PI 0123456789</p>
                    </Grid>
                    <Grid item xs={4}>
                        <p> Designed by Byteman</p>
                    </Grid>
                </Grid>
                <Grid item container>
                    <Grid item xs={6} >
                        <a href="https://www.facebook.com/ModaBerti" >Facebook</a>
                    </Grid>
                    <Grid item xs={6}>
                        <a href="https://www.instagram.com/modabertimarghera" >Instagram </a>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}


