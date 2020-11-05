import React, { useContext, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Navbar } from './pages/navbar/Navbar';
import { Footer } from './pages/footer/Footer';

import { Home } from './pages/home/Home';
import { Shop } from './pages/home/shop/Shop';
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
import { useQuery } from 'react-query';
import decode from 'jwt-decode';
import api from './api/axiosIstance';
import { LoggedUser, Token } from './interfaces/interfaces';
import { Brands } from './pages/brands/Brands';
import { ForgotPassword } from './pages/auth/forgotPassword/ForgotPassword';
import { MobileDrawer } from './pages/navbar/mobileDrawer/MobileDrawer';

export const Router: React.FC = () => {
    const { user, setUser } = useContext(UserContext)
    const { token, isLoggedIn, isAdmin }: LoggedUser = user;

    const [openMobile, setOpenMobile] = useState(false)

    const openMobileDrawer = () => {
        setOpenMobile(!openMobile);
    }

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
        staleTime: 1000 * 60 * 14,
        refetchInterval: 1000 * 60 * 14,
        refetchOnReconnect: true,
        refetchOnMount: true,
    }
    );
    return (
        <BrowserRouter>
            <Navbar openMobile={openMobile} setOpenMobile={openMobileDrawer} />
            <MobileDrawer openMobile={openMobile} setOpenMobile={openMobileDrawer} />
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

            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/stripe" component={Stripe} />

            {/* <Route path="*" render={() => <h1>404 not found</h1>} /> */}
            {/*  </Switch> */}
            <Footer />
        </BrowserRouter>
    )
}