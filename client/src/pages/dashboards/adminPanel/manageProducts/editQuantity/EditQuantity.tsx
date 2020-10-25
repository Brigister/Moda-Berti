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
import { SizeForm } from '../../../../../components/SizeForm';
import { useQuery } from 'react-query';
import api from '../../../../../api/axiosIstance';
import { AdminSize } from '../../../../../interfaces/interfaces';

interface EditQuantityProps {
    id: number;
    sizes: AdminSize[];
    clicked: boolean;
    handleBackdropEditQuantity: () => void;
}
export const EditQuantity: React.FC<EditQuantityProps> = ({ id, sizes, clicked, handleBackdropEditQuantity }) => {
    console.log(id);
    console.log(sizes);

    const { register, handleSubmit, control, } = useForm<any>({
        defaultValues: { sizes }
    });


    const onSubmit = async (data: AdminSize[]) => {
        console.log(data);

    }
    return (
        <>
            <Dialog
                open={clicked}
                onBackdropClick={handleBackdropEditQuantity}
                /* className={styles.dialog} */
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>Modifica Disponibilità</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SizeForm
                            ref={register}
                            control={control}
                        />
                    </form>

                </DialogContent>
            </Dialog>
        </>
    )
}
