import { AxiosError } from 'axios'; 

export type Car = {
    id: string,
    name: string, 

    // definitely change this
    collectionId: string | undefined; 
    imageUrl: string; 
}

export type Collection = {
    id: string, 
    name: string, 
    userId: string, 
    imageUrl: string
}

export type User = {
    id: string,
    email: string,
    username: string, 
    password: string
}

export interface IUsersState {
    users: User[]; 
    requesting: boolean; 
    loaded: boolean; 
    error: AxiosError | null;
}

export type MyError = {
    message: string
}

