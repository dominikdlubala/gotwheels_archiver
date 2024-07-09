import { createSlice } from '@reduxjs/toolkit'; 
import type { IUsersState } from '../../types/types'; 
import { AxiosError } from 'axios'; 

const usersSlice = createSlice({
    name: 'users', 
    initialState: <IUsersState>{
        users: [], 
        requesting: false, 
        loaded: false, 
        error: null
    }, 
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload; 
            state.requesting = false; 
            state.loaded = true; 
            state.error = null; 
        }, 
        catchException: (state, {payload}: {payload: AxiosError}) => {
            return {
                ...state, 
                loaded: false, 
                error: payload
            }
        }
    }
})

export const {
    getUsers, 
    catchException
} = usersSlice.actions; 
export default usersSlice.reducer; 