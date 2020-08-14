import React, { useState } from 'react';
import axios from 'axios';

import { useForm, useFieldArray } from 'react-hook-form';
import { editProduct } from '../../../../redux/ProductsReducer';
import { useDispatch } from 'react-redux';


import styles from './../addProduct/addProduct.module.css'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    InputAdornment,
} from '@material-ui/core'

export const EditProduct = ({ id, name, brand, price }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes"
    })

    const onSubmit = async (data) => {
        console.log(data);
        data.id = id
        console.log(data)
        /*  await axios.patch(`http://localhost:4000/api/products/${id}`, data); */
        dispatch(editProduct(data));

    }

    const handleModal = () => {
        setOpen(!open);
    }
    return (
        <>
            <Button
                onClick={handleModal}
                variant="contained"
                color="primary"
            >
                Modifica
            </Button>
            <Dialog
                open={open}
                onClose={handleModal}
                /* className={styles.dialog} */
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Modifica Prodotto</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField className={styles.field}
                            inputRef={register}
                            name="name"
                            variant="outlined"
                            label="Nome Prodotto"
                            defaultValue={name}
                            autoFocus

                        />
                        <TextField
                            inputRef={register}
                            name="brand"
                            variant="outlined"
                            label="Brand"
                            defaultValue={brand}

                            className={styles.field}
                        />
                        <TextField
                            inputRef={register}
                            name="price"
                            variant="outlined"
                            label="Prezzo"
                            defaultValue={price}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">€</InputAdornment>

                            }}

                            className={styles.field}
                        />
                        {fields.map((field, index) => (
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => append()}
                            className={styles.button}
                        >
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
        </>
    )
}
