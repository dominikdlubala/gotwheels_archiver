import { PayloadAction } from '@reduxjs/toolkit'; 
import axios, { AxiosError } from 'axios'; 
import type { AppDispatch } from '../index'; 
import { dbUrl } from '../../firebaseSetup'; 
import type { IUsersState } from '../../types/types'; 
import { getUsers, catchException } from '../slices/usersSlice'; 



export const fetchUsers = () => {
    return async (dispatch: AppDispatch) => {
        const response: PayloadAction<IUsersState> | PayloadAction<AxiosError> = 
            await axios.get(`${dbUrl}/users.json`)
                .then(response => dispatch(getUsers(response.data)))
                .catch(error => dispatch(catchException(error))); 
        return response; 
    }
}
