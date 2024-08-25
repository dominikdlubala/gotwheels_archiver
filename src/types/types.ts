import { AxiosError } from 'axios'; 

import firebase from 'firebase/compat/app'; 

export type FirebaseUser = firebase.User; 

export type Car = {
    model: string; 
    series?: string; 
    series_num?: string;
    toy_num?: string; 
    year: number; 
    photo_url?: string; 
    firebase_url?: string; 
    docId: string;
    treasure_hunt?: string;
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

