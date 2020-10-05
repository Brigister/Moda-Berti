import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';

import styles from './itemDetails.module.css'
import { ProductDescription } from './ProductDescription';

import { useQuery } from 'react-query';
import api from '../../../api/axiosIstance';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const ItemDetails = () => {

    const classes = useStyles();
    let { id } = useParams();

    const [size, setSize] = useState();


    const { isLoading, error, data } = useQuery(['productDetails', id], () =>
        api.get(`products/${id}`).then(res =>
            res.data.data
        )
    )
    console.log(data);
    if (isLoading) return <h3>loading...</h3>
    if (error) return <h3>Errore: {error.message}</h3>


    const { name, brand, image_url, price, sizes, descriptions } = data;
    const handleSize = (e) => setSize(e.target.value)


    const addToCart = () => {
        const data = {
            userId: 3,
            productId: id,
            name,
            price,
            image_url,
            size
        }
        console.log(data);


    }

    return (
        <Grid container className={styles.container}>
            <Grid item xs={2} />
            <Grid item xs={3}>

                <img src={`http://localhost:4000/${image_url}`} alt={name} className={styles.image} />

            </Grid>
            <Grid item container xs={3}>
                <Grid item xs={12}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.brand}>{brand}</p>

                    <p className={styles.price}>{price ? `${price / 100}€` : 'prezzo non disponibile'}</p>
                </Grid>

                <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Taglia</InputLabel>
                        <Select
                            value={size || "Seleziona"}
                            onChange={handleSize}
                        >
                            <MenuItem value="Seleziona">Seleziona</MenuItem>

                            {sizes && sizes.map(({ id, size }) => <MenuItem key={id} value={size}>{size}</MenuItem>)}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <ul>
                        {descriptions && descriptions.map(({ id, description }) => <ProductDescription key={id} description={description} />)}

                    </ul>
                </Grid>

            </Grid>
            <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={addToCart}>Aggiungi al carrello</Button>
            </Grid>
            <Grid item xs={2} />
        </Grid >

    )
}

export default ItemDetails;


