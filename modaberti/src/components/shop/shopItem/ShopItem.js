import React from 'react'
import { BrowserRouter as Router, Link, Route, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@material-ui/core';

import styles from './shopitem.module.css'

import ItemDetails from '../itemDetails/ItemDetails'
import { ShopList } from '../shoplist/ShopList';

const ShopItem = (props) => {


    const { _id, name, brand, imageUrl, price } = props.product
    let { path, url } = useRouteMatch();


    return (
        <>
            <Link to={`${url}/product/${_id}`}>
                <Card raised className={styles.item} >
                    <CardHeader
                        title={name}
                        subheader={brand}
                    />
                    {<img src={imageUrl}></img>}
                    <CardContent>
                        <p>{price ? `${price / 100}€` : "prezzo non disponibile"}</p>
                    </CardContent>
                </Card >
            </Link>

            {/* ho il cancro */}
            {/*    <Switch>
                <Route exact path={`${path}/product/:id`}>
                    <ItemDetails />
                </Route>
                <Route exact path={`/shop`}>

                </Route>
            </Switch> */}
        </>
    )
}


export default ShopItem;
