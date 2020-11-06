import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem, Size, Chip
} from '@material-ui/core';

import styles from './itemDetails.module.css'
import { ProductDescription } from './ProductDescription';

import { QueryResult, useMutation, useQuery, useQueryCache } from 'react-query';
import api from '../../../api/axiosIstance';
import { ProductDetails } from '../../../interfaces/interfaces';
import { Loading } from '../../../components/loading/Loading';
import { priceFormatter } from '../../../utils/priceFormatter';
import { MiniCart } from './miniCart/MiniCart';
import { NoImage } from '../../../components/NoImage';

interface ParamTypes {
    id: string
}

interface ToBeAdded {
    product_id: number,
    size: string
}

export const ItemDetails: React.FC = () => {
    let { id: paramId } = useParams<ParamTypes>();
    const cache = useQueryCache();

    const [currentSize, setCurrentSize] = useState<string>("");

    const [addProductToCart] = useMutation(async (data: ToBeAdded) => {
        const res = await api.post('cart', data);
        return res.data;
    }, {
        onSuccess: () => {
            cache.invalidateQueries('cart');
        }
    });

    const { isLoading, error, data }: QueryResult<any, Error> = useQuery(['productDetails', paramId], () =>
        api.get(`products/${paramId}`).then(res =>
            res.data.data));

    console.log(data);
    if (isLoading) return <Loading />
    if (error) return <h3>Errore: {error.message}</h3>

    const { id, name, brand, image_url, fabric, price, sizes }: ProductDetails = data;


    const addToCart = async () => {
        const data: ToBeAdded = {
            product_id: id,
            size: currentSize
        }
        console.log(data);
        await addProductToCart(data);

    }

    //ev: React.SyntheticEvent<HTMLImageEvent>?????
    const onImageError = (ev: any) => {
        console.log(ev);
        ev.target.src = require('../../../assets/noimage.jpg')
    }

    return (
        <Grid container justify="center" className={styles.container}>
            <Grid item xs={3}>
                <img
                    src={`http://localhost:4000/${image_url}`}
                    onError={onImageError}
                    alt={name}
                    className={styles.image} />

            </Grid>
            {/* mettere altre immagini */}
            <Grid item container xs={3}>
                <Grid item xs={12}>
                    <h2 className={styles.name}>{name}</h2>
                    <p className={styles.brand}>{brand}</p>
                    <p className={styles.fabric}>{`Tessuto: ${fabric ? fabric : "Tessuno non disponibile"}`}</p>
                    <p className={styles.price}><strong>{price ? `${priceFormatter(price)}€` : 'Prezzo non disponibile'}</strong></p>
                    <p className={styles.selectedSize}>{currentSize ? `Taglia: ${currentSize}` : <></>} </p>
                </Grid>

                <Grid item xs={12}>
                    {sizes && sizes.map(({ id, size }) =>
                        <Chip
                            className={styles.chip}
                            classes={size === currentSize ? { outlined: styles.active } : { outlined: styles.inactive }}
                            key={id}
                            size="medium"
                            label={size}
                            variant="outlined"
                            onClick={() => setCurrentSize(size)}
                        />)
                    }
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={addToCart}>Aggiungi al carrello</Button>
                </Grid>


            </Grid>
            <Grid item container xs={4} justify="center" >
                <MiniCart />
            </Grid>
        </Grid >

    )
}



/*
                    <FormControl className={classes.formControl}>
                <InputLabel>Taglia</InputLabel>
                <Select
                    value={size || "Seleziona"}
                    onChange={() => handleSize}
                >
                    <MenuItem value="Seleziona">Seleziona</MenuItem>

                    {sizes && sizes.map(
                        ({ id, size }) => <MenuItem key={id} value={size}>{size}</MenuItem>)}
                </Select>
            </FormControl>
*/