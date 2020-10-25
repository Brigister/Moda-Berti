import { TextField, Button } from '@material-ui/core'
import React, { forwardRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { MyFormField } from './MyFormField'

import styles from '../pages/dashboards/adminPanel/manageProducts/addProduct/addProduct.module.css'


interface SizeFormProps {

}


export const SizeForm: React.FC<any> = forwardRef((props, ref) => {

    const { fields, append, remove } = useFieldArray({
        control: props.control,
        name: "sizes",
    })

    console.log(fields);

    return (
        <>
            {fields.map((field, index) => (
                <div key={field.size}>
                    <MyFormField
                        name={`sizes[${index}].size`}
                        ref={ref}
                        label="Aggiungi taglia"
                    />

                    <MyFormField
                        name={`sizes[${index}].quantity`}
                        ref={ref}
                        label="Quantità"
                    />
                    <Button variant="contained" color="secondary" onClick={() => remove(index)}>Rimuovi</Button>
                </div>

            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={() => append({ size: 'size' })}
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
        </>
    )
})
