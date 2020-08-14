import React, { useState, useEffect } from 'react'
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
import { addProductToCart } from '../../../redux/CartReducer';
import { useSelector, useDispatch } from 'react-redux';
import { loggedUser } from '../../../redux/AuthReducer';

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
    const dispatch = useDispatch();
    const user = useSelector(loggedUser)
    const classes = useStyles();
    let { id } = useParams();

    const [product, setProduct] = useState({
        name: '',
        price: '',
        imageUrl: '',
        quantity: '',
        sizes: []
    });
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState(0);

    const quantities = []


    useEffect(() => {

        axios.get(`http://localhost:4000/api/products/${id}`)
            .then(res => {
                setProduct(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [id])

    const { name, brand, imageUrl, price, sizes } = product;

    const handleSize = (e) => setSize(e.target.value)

    const handleQuantity = (e) => setQuantity(e.target.value)

    const addToCart = () => {
        const data = {
            userId: user.id,
            productId: id,
            name,
            price,
            imageUrl,
            size
        }
        console.log(data);

        dispatch(addProductToCart(data));
    }

    return (
        <Grid container className={styles.container}>
            <Grid item xs={2} />
            <Grid item xs={3}>

                <img src={`http://localhost:4000/${imageUrl}`} alt={name} className={styles.image} />

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

                            {sizes.map(size => <MenuItem key={size._id} value={size.size}>{size.size}</MenuItem>)}

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <ul>
                        <li className={styles.description}>Descrizione</li>
                        <li className={styles.description}>Descrizione</li>
                        <li className={styles.description}>Descrizione</li>
                        <li className={styles.description}>Descrizione</li>
                        <li className={styles.description}>Descrizione</li>
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


