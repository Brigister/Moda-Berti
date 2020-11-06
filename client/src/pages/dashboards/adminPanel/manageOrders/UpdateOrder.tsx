import React from 'react'
import { Button, Dialog, Modal } from '@material-ui/core'
import { useMutation, useQueryCache } from 'react-query';
import api from '../../../../api/axiosIstance';
import { useForm } from 'react-hook-form';
import { MyFormField } from '../../../../components/MyFormField';

interface UpdateOrder {
    id?: number
    status: string,
    tracking?: string
}


interface UpdateOrderProps {
    id: number
    openUpdateOrderModal: boolean;
    setOpenUpdateOrderModal: () => void
}


export const UpdateOrder: React.FC<UpdateOrderProps> = ({
    id,
    openUpdateOrderModal,
    setOpenUpdateOrderModal
}) => {
    const cache = useQueryCache();
    const { register, handleSubmit } = useForm<UpdateOrder>();
    const [updateOrder] = useMutation(async ({ id, ...data }: UpdateOrder) => {
        console.log(data);
        const res = await api.patch(`orders/${id}`, data);
        return res.data;
    }, {
        onSuccess: (_, { id, tracking, status }) => {
            cache.invalidateQueries('orders');
        }
    })

    const handleUpdate = async (data: UpdateOrder) => {
        console.log(data);
        data.id = id
        await updateOrder(data);

    }
    console.log(id);

    return (
        <Dialog
            fullWidth
            open={openUpdateOrderModal}
            onBackdropClick={setOpenUpdateOrderModal}
        >
            <h2>Modifica Dettagli Ordine</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <MyFormField
                    ref={register}
                    name="status"
                    label="Status"
                    autoFocus
                />
                <MyFormField
                    ref={register}
                    name="tracking"
                    label="Tracking"

                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Salva
                </Button>
            </form>
        </Dialog>
    )
}
