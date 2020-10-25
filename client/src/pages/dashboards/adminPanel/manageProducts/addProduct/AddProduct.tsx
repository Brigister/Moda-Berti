import React, { useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputAdornment,
} from '@material-ui/core'

import styles from './addProduct.module.css'
import { useForm, useFieldArray, ArrayField } from 'react-hook-form';
import { MyFormField } from '../../../../../components/MyFormField';
import { useMutation, useQueryCache } from 'react-query';
import { Product, ProductDetails } from '../../../../../interfaces/interfaces';
import api from '../../../../../api/axiosIstance';

interface AddProductProps {
    clicked: boolean;
    handleBackdropAddProduct: () => void;
}

interface AddProduct {
    name: string,
    image: File,
    brand: string,
    price: number
    sizes?: {
        size: string
    }[]
}


export const AddProduct: React.FC<AddProductProps> = ({ clicked, handleBackdropAddProduct }) => {
    const cache = useQueryCache();
    const { register, handleSubmit, control } = useForm<AddProduct>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes"
    })


    const [addProduct] = useMutation(async (data: FormData) => {
        console.log('formdata', data);

        const res = await api.post('products', data, {
            headers: {
                'content-type': undefined
            }
        });
        return res.data;
    }, {
        onSuccess: ({ data }: { data: Product }, variables) => {
            console.log(data);
            const products = cache.getQueryData('products');
            const newProducts = [...products as Product[], data]
            cache.setQueryData('products', newProducts)
        }
    });

    const onSubmit = async (data: any) => {
        console.log(data.image[0])
        let fd = new FormData()
        fd.append("name", data.name);
        fd.append("brand", data.brand);
        fd.append("price", data.price);
        fd.append("image", data.image[0]);
        fd.append("sizes", JSON.stringify(data.sizes));



        console.log(fd);

        const nome = fd.get("image");
        console.log(data);
        console.log(nome);

        await addProduct(fd);
    }

    return (

        <Dialog
            open={clicked}
            onBackdropClick={handleBackdropAddProduct}
            className={styles.dialog}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>Aggiungi un Prodotto</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MyFormField
                        ref={register}
                        name="name"
                        label="Nome Prodotto"
                        autoFocus
                    />

                    <MyFormField
                        ref={register}
                        name="image"
                        type='file'
                    />

                    <MyFormField
                        ref={register}
                        name="brand"
                        label="Brand"
                    />

                    <MyFormField inputRef={register}
                        name="price"
                        label="Prezzo"
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">€</InputAdornment>

                        }}
                    />

                    {fields && fields.map((field, index) => (
                        <div key={field.id}>
                            <TextField

                                name={`sizes[${index}].size`}
                                inputRef={register}
                                label="Aggiungi taglia"
                            />
                            <TextField

                                name={`sizes[${index}].quantity`}
                                inputRef={register}
                                label="Quantità"
                            />
                            <Button variant="contained" color="secondary" onClick={() => remove(index)}>
                                Rimuovi
                                </Button>
                        </div>

                    ))}
                    <Button variant="contained" color="primary" onClick={() => append({ size: 'size' })}>
                        Aggiungi taglia
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={styles.button}
                    >Aggiungi
                        </Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}
