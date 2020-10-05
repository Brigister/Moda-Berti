import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import {
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    Button
} from '@material-ui/core';
import { AddProduct } from './addProduct/AddProduct';
import { EditQuantity } from './editQuantity/EditQuantity';
import { EditProduct } from './editProduct/EditProduct';
import api from '../../../../api/axiosIstance';

export const ManageProducts = () => {


    const { isLoading, error, data } = useQuery('products', () =>
        api.get(`products`).then(res =>
            res.data.data
        )
    )

    const handleProductDelete = (id, image_url) => {
        const data = {
            id,
            image_url
        }
    }

    return (
        <>

            <AddProduct />

            <h1>Prodotti</h1>
            <TableContainer component={Paper}>
                <Table aria-label="tabella dei prodotti">
                    <TableHead>
                        <TableRow>

                            <TableCell>Nome</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell >Foto</TableCell>
                            <TableCell >Brand</TableCell>
                            <TableCell >Prezzo</TableCell>
                            {/* <TableCell>Disponibilità</TableCell> */}
                            <TableCell >Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <img width="100px" src={`http://localhost:4000/${product.image_url}`} alt={product.name} />
                                </TableCell>
                                <TableCell >{product.brand}</TableCell>
                                <TableCell >{product.price ? `${product.price / 100}€` : 'prezzo non disponibile'}</TableCell>
                                {/* <TableCell>{product.sizes.map(size => <p key={size.size}>{size.size}: {size.quantity}</p>)}</TableCell> */}
                                <TableCell >
                                    <Button
                                        onClick={() => handleProductDelete(product.id, product.image_url)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Elimina
                                    </Button>
                                    <EditProduct
                                        id={product._id}
                                        name={product.name}
                                        brand={product.brand}
                                        price={product.price}
                                    />
                                    <EditQuantity id={product._id} />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
