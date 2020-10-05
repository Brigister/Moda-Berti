import React, { useState } from 'react'
import {
    List,
    ListItem,
    ListItemText,
    Collapse
} from '@material-ui/core';
import {
    ExpandLess,
    ExpandMore
} from '@material-ui/icons';

export const Sidebar = () => {
    const [open] = useState([]);

    const [genders] = useState([
        {
            id: 1,
            text: "Uomo"
        },
        {
            id: 2,
            text: "Donna"
        },
        {
            id: 3,
            text: "Intimo"
        },



    ])

    const sizes = ["36", "38", "40", "42", "44", "46"]


    return (
        <List>
            {genders.map(gender => (
                <ListItem button key={gender.id}>
                    <ListItemText primary={gender.text} />
                    {console.log(`index=${gender.id}, text=${gender.text}`)}

                    {open ? <ExpandLess /> : <ExpandMore />}
                    <Collapse in={open} >
                        <List component="div" >
                            {sizes.map(size => (
                                <ListItemText primary={size} />
                            ))}
                        </List>
                    </Collapse>
                </ListItem >
            ))
            }
        </List >
    )

}
