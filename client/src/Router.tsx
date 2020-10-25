import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Navbar } from './pages/navbar/Navbar';
import { Footer } from './pages/footer/Footer';

import { Home } from './pages/home/Home';
import { Shop } from './pages/shop/shop/Shop';
import { ShopList } from './pages/shop/shoplist/ShopList';
import { Stripe } from './pages/check-out/stripe/Stripe';
import { About } from './pages/about/About';
import { ItemDetails } from './pages/shop/itemDetails/ItemDetails';
import { Signup } from './pages/auth/signup/Signup';
import { Login } from './pages/auth/login/Login';
import { AdminPanel } from './pages/dashboards/adminPanel/AdminPanel';
import { Logout } from './pages/auth/logout/Logout';

import { Cart } from './pages/check-out/cart/Cart';
import { UserPanel } from './pages/dashboards/userPanel/UserPanel';
import { OrderList } from './pages/dashboards/userPanel/orders/OrderList';
import { Settings } from './pages/dashboards/userPanel/settings/Settings';
import { ChangePassword } from './pages/dashboards/userPanel/settings/ChangePassword';
import { UserContext } from './context/UserContext';
import { QueryResult, useMutation, useQuery } from 'react-query';
import decode from 'jwt-decode';
import api from './api/axiosIstance';
import { LoggedUser, Token } from './interfaces/interfaces';
import { Brands } from './pages/brands/Brands';

export const Router: React.FC = () => {
    const { user, setUser } = useContext(UserContext)
    const { token, isLoggedIn, isAdmin }: LoggedUser = user;

    api.interceptors.request.use(
        config => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    );
    useQuery('refreshToken', () =>
        api.post(`auth/refreshToken`).then(res => {
            const { userId, isAdmin }: Token = decode(res.data.token)
            console.log(userId)
            setUser({
                token: res.data.token,
                userId,
                isLoggedIn: true,
                isAdmin
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
            <Route exact path="/brands" component={Brands} />
            <Route exact path="/shop/products" component={ShopList} />

            {/* <Route exact path="/shop" component={ShopList} /> */}
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

            {isLoggedIn
                ?
                <>
                    <Route path="/cart" component={Cart} />
                    <Route path="/logout" component={Logout} />
                </>
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