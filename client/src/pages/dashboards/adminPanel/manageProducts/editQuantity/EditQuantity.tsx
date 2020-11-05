import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryCache } from 'react-query';
import {
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core'
import { SizeForm } from '../../../../../components/SizeForm';
import { AdminProductDetails, AdminSize } from '../../../../../interfaces/interfaces';
import api from '../../../../../api/axiosIstance';

interface EditQuantityProps {
    id: number;
    product?: AdminProductDetails;
    clicked: boolean;
    closeEditQuantity: () => void;
}
export const EditQuantity: React.FC<EditQuantityProps> = ({ id, product, clicked, closeEditQuantity }) => {
    const cache = useQueryCache();

    const { sizes } = product!;
    const { register, handleSubmit, control, } = useForm<any>({
        defaultValues: { sizes }
    });

    const [addSizes] = useMutation(async (data: AdminSize[]) => {
        const res = await api.patch(`products/${id}/editSizes`, data);
        console.log(res.data);
        return res.data;
    }, {
        onSuccess: (_, variables) => {
            /* const products = cache.getQueryData('products') as AdminProductDetails[];
            const index = products.findIndex(product => product.id === id);
            products[index].sizes = variables;
            cache.setQueryData('products', products) */
            cache.invalidateQueries('products');
        }
    })

    const onSubmit = async (data: AdminSize[]) => {
        console.log(data);
        await addSizes(data);
        closeEditQuantity();

    }
    return (
        <>
            <Dialog
                open={clicked}
                onBackdropClick={closeEditQuantity}
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
