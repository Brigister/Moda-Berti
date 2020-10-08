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


export interface Product {
    id: number;
    article_id: string;
    name: string;
    brand: string;
    gender: string;
    collection: string;
    price: number;
    image_url: string;
    create_time: string;
}

export interface ISize {
    id: number;
    size: string;
}
export interface IDescription {
    id: number;
    description: string;
}

export interface ProductDetails extends Product {
    id: number;
    article_id: string;
    name: string;
    brand: string;
    gender: string;
    collection: string;
    price: number;
    image_url: string;
    create_time: string;
    sizes?: ISize[],
    descriptions?: IDescription[]
}