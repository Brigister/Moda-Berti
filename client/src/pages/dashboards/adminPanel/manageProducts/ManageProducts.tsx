import React, { useState } from 'react';
import { QueryResult, useMutation, useQuery, useQueryCache } from 'react-query';
import api from '../../../../api/axiosIstance';

import {
    Button,
} from '@material-ui/core';
import { ColDef, DataGrid, RowData, RowsProp, ValueFormatterParams, ValueGetterParams } from '@material-ui/data-grid';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { AddProduct } from './addProduct/AddProduct';
import { EditQuantity } from './editQuantity/EditQuantity';
import { EditProduct } from './editProduct/EditProduct';
import { AdminProductDetails, AdminSize, ISize, Product } from '../../../../interfaces/interfaces';
import { Loading } from '../../../../components/loading/Loading';

interface DeleteProduct {
    id: number,
    image_url: string
}

export const ManageProducts: React.FC = () => {
    const cache = useQueryCache();
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [id, setId] = useState<number>();

    const { isLoading, error, data }: QueryResult<AdminProductDetails[], Error> = useQuery('products', () =>
        api.get(`products/all`).then(res =>
            res.data.data.products
        )
    );

    const [deleteProduct] = useMutation(async (data: any) => {
        const res = await api.delete(`products`, {
            data: data
        })
        return res.data;


    }, {
        onSuccess: (_, { id }) => {
            const newData = data?.filter((product) => product.id != id)
            cache.setQueryData('products', newData);
        }
    })
    const handleBackdropAddProduct = (): void => {
        setOpenAddModal(openAddModal);
    }
    const closeEditQuantity = (): void => {
        setOpenSizeModal(!openSizeModal);
    }

    const handleDelete = async (id: number, image_url: string) => {
        const data = {
            id,
            image_url
        }
        console.log(data);
        await deleteProduct(data);

    }

    const columns: ColDef[] = [
        { field: 'id', headerName: 'Id' },
        { field: 'name', headerName: 'Nome', width: 250 },
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'gender', headerName: 'Genere', width: 200 },
        {
            field: 'sizes.size',
            headerName: 'Taglie',
            width: 250,
            renderCell: (param: ValueFormatterParams) => (
                param.data.sizes.map(({ id, size, quantity }: AdminSize) =>
                    <p key={id}>{size}:{quantity}</p>

                )
            )
        },
        {
            field: 'price', headerName: 'Prezzo', width: 150, valueGetter: (params: ValueGetterParams) => `${(params.getValue("price")) as number / 100}€`
        },
        {
            field: 'image_url',
            headerName: 'Immagine',
            width: 100,
            renderCell: (params: ValueFormatterParams) => (
                <img src={`http://localhost:4000/${params.getValue('image_url')}`} />
            )
        },
        {
            field: 'edit',
            headerName: 'Modifica',
            renderCell: (params: ValueGetterParams) => (
                <EditIcon
                    cursor="pointer"
                    onClick={() => {
                        setOpenSizeModal(true)
                        setId(params.getValue('id') as number)
                    }}
                />)

        },
        {
            field: 'addPhotos',
            headerName: 'Foto',
            renderCell: (params: ValueGetterParams) => (
                <PhotoLibraryIcon
                    cursor="pointer"
                    onClick={() => console.log('titi')}
                />)

        },
        {
            field: 'delete',
            headerName: 'Elimina',
            renderCell: (params: ValueGetterParams) => (
                <DeleteIcon
                    cursor="pointer"
                    onClick={() => handleDelete(params.getValue('id') as number, params.getValue('image_url') as string)} />
            )
        }

    ]

    if (!data) return <h3>No data</h3>
    if (error) return <h3>Errore: {error.message}</h3>

    return (
        <div>
            <Button
                onClick={() => setOpenAddModal(true)}
                variant="contained"
                color="primary"
            >
                Aggiungi Prodotto
            </Button>

            {openAddModal
                ?
                <AddProduct
                    clicked={openAddModal}
                    handleBackdropAddProduct={handleBackdropAddProduct}
                />
                :
                <></>
            }

            {openSizeModal
                ?
                <EditQuantity
                    id={id!}
                    /*                     product={data.filter(product => product.id === id)}*/
                    product={data.find(product => product.id === id)}
                    clicked={openSizeModal}
                    closeEditQuantity={closeEditQuantity}
                />
                :
                <></>
            }
            {id}

            <h1>Prodotti</h1>
            <DataGrid
                columns={columns}
                rows={data}
                rowHeight={80}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                autoHeight
                loading={isLoading}
                components={{
                    loadingOverlay: Loading
                }}
            />
        </div>
    )
}