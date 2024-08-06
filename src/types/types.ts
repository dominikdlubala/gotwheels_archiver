import { AxiosError } from 'axios'; 

import firebase from 'firebase/compat/app'; 

export type FirebaseUser = firebase.User; 

export type Car = {
    model: string; 
    series?: string; 
    series_num?: string;
    toy_num?: string; 
    year: number; 
    photo_url?: string 

    // id: string,
    // name: string, 
    // userId: string,

    // // definitely change this
    // collectionId: string | undefined; 
    // imageUrl: string; 
}

export type Collection = {
    id: string, 
    name: string, 
    userId: string, 
    imageUrl: string
}

export type User = {
    // id: string,
    // email: string,
    // username: string, 
    // password: string
    username: string
    id: string
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

