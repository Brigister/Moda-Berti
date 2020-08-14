import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, selectProducts, deleteProduct } from '../../../redux/ProductsReducer'
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

export const ManageProducts = () => {
    const { products, loading } = useSelector(selectProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts("/api/products"));
    }, [])

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
                            <TableCell>Disponibilità</TableCell>
                            <TableCell >Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell component="th" scope="row">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>
                                    <img width="100px" src={`http://localhost:4000/${product.imageUrl}`} />
                                </TableCell>
                                <TableCell >{product.brand}</TableCell>
                                <TableCell >{product.price ? `${product.price / 100}€` : 'prezzo non disponibile'}</TableCell>
                                <TableCell>{product.sizes.map(size => <p key={size.size}>{size.size}: {size.quantity}</p>)}</TableCell>
                                <TableCell >
                                    <Button
                                        onClick={() => dispatch(deleteProduct(product._id))}
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
