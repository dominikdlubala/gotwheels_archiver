import axios from 'axios'; 
import type { User } from '../../types/userType';  
import { createAppAsyncThunk } from '../../hooks/storeHooks';

type MyError = {
    errorMessage: string
}

const backendUrl = 'http://localhost:3005';

export const userLogin = createAppAsyncThunk(
    'auth/login', 
    async ( { email, password }: User, thunkApi) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const response = await axios.post(
                `${backendUrl}/login`, 
                {email, password}, 
                config
            ); 

            localStorage.setItem('userToken', response.data.userToken); 
            return response.data; 

        } catch (err) {
            return thunkApi.rejectWithValue({errorMessage: "error with login"} as MyError)
        }
    }
)