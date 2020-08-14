import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/Footer';

import { Home } from './components/home/Home';
import { ShopList } from './components/shop/shoplist/ShopList';
import { Stripe } from './components/cart/stripe/Stripe';
import { About } from './components/about/About';
import ItemDetails from './components/shop/itemDetails/ItemDetails';
import { Signup } from './components/auth/signup/Signup';
import { Login } from './components/auth/login/Login';
import { AdminPanel } from './components/adminPanel/AdminPanel';
import { Logout } from './components/auth/logout/Logout';

import { Cart } from './components/cart/Cart';
import { useSelector } from 'react-redux';
import { loggedUser } from './redux/AuthReducer';

export const Router = () => {
    const { isLoggedIn, isAdmin } = useSelector(loggedUser)
    return (
        <BrowserRouter>
            <Navbar />

            {/* <Switch> */}
            <Route exact path="/" component={Home} />

            <Route exact path="/shop" component={ShopList} />
            <Route exact path={`/shop/product/:id`} component={ItemDetails} />
            <Route path="/adminPanel" component={AdminPanel} />

            <Route path="/about" component={About} />
            <Route path="/cart" component={Cart} />

            {isLoggedIn
                ?
                <Route path="/logout" component={Logout} />
                :
                <>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                </>
            }


            <Route path="/resetPassword" component={Login} />
            <Route path="/stripe" component={Stripe} />
            {/*  </Switch> */}
            <hr></hr>
            <p>{isAdmin ? "sei admin" : "non sei admin"}</p>
            <p>{isLoggedIn ? "sei loggato" : "non sei loggato"}</p>
            <Footer />


        </BrowserRouter>
    )
}
