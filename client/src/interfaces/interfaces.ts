export interface LoggedUser {
    token: string,
    userId?: number,
    isLoggedIn: boolean,
    isAdmin: boolean
}

export type user = LoggedUser & {
    setUser?: () => LoggedUser
}

export interface Token {
    userId: number,
    isAdmin: boolean,
    exp: number
}

export interface LoginData {
    email: string,
    password: string
}

export interface SignupData {
    name: string,
    surname: string,
    email: string,
    password: string
}

export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    isAdmin: boolean,
    create_time: Date
}

export interface Product {
    id: number;
    article_id: string;
    name: string;
    brand: string;
    fabric: string;
    gender: string;
    collection: string;
    price: number;
    image_url: string;
    create_time: Date;
}

export interface ISize {
    id: number;
    size: string;
}

export interface AdminSize extends ISize {
    quantity: number
}

export interface IDescription {
    id: number;
    description: string;
}

export interface ProductDetails extends Product {
    sizes?: ISize[];
    descriptions?: IDescription[];
    image?: Blob
}

export interface AdminProductDetails extends Product {
    sizes: AdminSize[];
}

export interface OrderProduct extends Product {
    product_id: number;
    size: string;
}

export interface Order {
    id: number;
    status: string;
    products?: OrderProduct[];
    tracking: string;
    create_time: Date;
}

export interface StripeProps {
    total: number
}

export interface MobileDrawerProps {
    openMobile: boolean;
    setOpenMobile: () => void
}