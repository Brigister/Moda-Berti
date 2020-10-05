import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/Footer';

import { Home } from './components/home/Home';
import { Shop } from './components/shop/shop/Shop';
import { ShopList } from './components/shop/shoplist/ShopList';
import { Stripe } from './components/cart/stripe/Stripe';
import { About } from './components/about/About';
import ItemDetails from './components/shop/itemDetails/ItemDetails';
import { Signup } from './components/auth/signup/Signup';
import { Login } from './components/auth/login/Login';
import { AdminPanel } from './components/dashboards/adminPanel/AdminPanel';
import { Logout } from './components/auth/logout/Logout';

import { Cart } from './components/cart/Cart';
import { UserPanel } from './components/dashboards/userPanel/UserPanel';
import { OrderList } from './components/dashboards/userPanel/orders/OrderList';
import { Settings } from './components/dashboards/userPanel/settings/Settings';
import { ChangePassword } from './components/dashboards/userPanel/settings/ChangePassword';
import { UserContext } from './context/UserContext';
import { useMutation, useQuery } from 'react-query';
import api from './api/axiosIstance';
import decode from 'jwt-decode';

export const Router = () => {
    console.log('render')
    const { user, setUser } = useContext(UserContext)
    const { isLoggedIn, isAdmin } = user;

    api.interceptors.request.use(
        config => {
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );

    const { data } = useQuery('refreshToken', () =>
        api.post(`auth/refreshToken`).then(res => {
            const decoded = decode(res.data.token)
            setUser({
                token: res.data.token,
                isLoggedIn: true,
                isAdmin: decoded.isAdmin
            })
        }), {
        staleTime: 1000 * 60 * 15,
        refetchInterval: 1000 * 60 * 15,
        refetchOnReconnect: true,
        refetchOnMount: true,
    }
    );
    return (
        <BrowserRouter>
            <Navbar />
            {/* ROMPE TUTTO LO SWITCH */}
            {/* <Switch> */}
            <Route exact path="/" component={Home} />

            {/* <Route exact path="/shop" component={Shop} />
            <Route exact path="/shop/shoplist" component={ShopList} />
            <Route path={`/shop/product/:id`} component={ItemDetails} /> */}

            <Route exact path="/shop" component={ShopList} />
            <Route exact path={`/shop/product/:id`} component={ItemDetails} />

            {isLoggedIn && isAdmin
                ?
                <Route path="/adminPanel" component={AdminPanel} />
                :
                <>
                    <Route exact path="/userPanel" component={UserPanel} />
                    <Route path={`/userPanel/orderList`} component={OrderList} />
                    <Route exact path={`/userPanel/settings`} component={Settings} />
                    <Route path={'/userPanel/settings/changePassword'} component={ChangePassword} />
                </>
            }


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
            {/* <Route path="*" render={() => <h1>404 not found</h1>} /> */}
            {/*  </Switch> */}
            <hr></hr>
            <p>{isAdmin ? "sei admin" : "non sei admin"}</p>
            <p>{isLoggedIn ? "sei loggato" : "non sei loggato"}</p>
            <Footer />
        </BrowserRouter>
    )
}
