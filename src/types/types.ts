import { AxiosError } from 'axios'; 

export type Car = {
    id: string,
    name: string, 
    collectionId: number 
}

export type Collection = {
    id: string, 
    name: string, 
    userId: number
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