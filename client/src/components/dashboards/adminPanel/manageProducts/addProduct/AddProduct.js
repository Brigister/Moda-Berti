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
import { useForm, useFieldArray } from 'react-hook-form';


export const AddProduct = () => {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes"
    })

    const handleModal = () => {
        setOpen(!open);
    }

    const onSubmit = (data) => {
        let fd = new FormData()
        fd.append("name", data.name);
        fd.append("brand", data.brand);
        fd.append("price", data.price);
        fd.append("image", data.image[0]);
        fd.append("sizes", JSON.stringify(data.sizes));



        console.log(fd);

        const nome = fd.get("sizes");
        console.log(data);
        console.log(nome);
    }

    return (
        <>
            <Button
                onClick={handleModal}
                variant="contained"
                color="primary"
            >
                Aggiungi Prodotto
            </Button>

            <Dialog
                open={open}
                onClose={handleModal}
                className={styles.dialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Aggiungi un Prodotto</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField className={styles.field}
                            inputRef={register}
                            name="name"
                            variant="outlined"
                            label="Nome Prodotto"
                            autoFocus
                            required
                        />

                        <TextField
                            inputRef={register}
                            type="file"
                            name="image"
                            variant="outlined"
                            required
                            className={styles.field}

                        />
                        <TextField
                            inputRef={register}
                            name="brand"
                            variant="outlined"
                            label="Brand"
                            required
                            className={styles.field}
                        />
                        <TextField
                            inputRef={register}
                            name="price"
                            variant="outlined"
                            label="Prezzo"
                            InputProps={{
                                startAdornment:
                                    <InputAdornment position="start">€</InputAdornment>

                            }}
                            required
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
                        <Button variant="contained" color="primary" onClick={() => append()}>
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
