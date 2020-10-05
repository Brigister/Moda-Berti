import React, { useState } from 'react';

import { useForm, useFieldArray } from 'react-hook-form';
/* import { } from "../../../../../redux/ProductsReducer"; */



import styles from '../addProduct/addProduct.module.css'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
} from '@material-ui/core'

export const EditQuantity = ({ id }) => {
    console.log(id);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, control } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sizes"
    })

    const onSubmit = async (data) => {
        console.log(data);

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
                Modifica Taglie
            </Button>
            <Dialog
                open={open}
                onClose={handleModal}
                /* className={styles.dialog} */
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Modifica Disponibilità</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
