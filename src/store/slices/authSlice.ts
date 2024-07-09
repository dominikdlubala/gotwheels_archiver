import { createSlice } from '@reduxjs/toolkit'; 
import type { User } from '../../types/userType'; 
// import { userLogin } from '../thunks/userLogin'; 

type MyError = {
    errorMessage: string
}

type SliceState = {
    userInfo: User | null;
    isLoading: boolean;
    userToken: string | null;
    isError: MyError | null; 
    isSuccess: boolean; 
}

const authSlice = createSlice({
    name: 'auth', 
    initialState: <SliceState>{
        userInfo: null, 
        isLoading: false, 
        userToken: null,
        isError: null, 
        isSuccess: false
    }, 
    reducers: {}, 
    extraReducers: (builder) => {
        // builder.addCase(userLogin.pending, (state) =>  {   
        //     state.isLoading = true; 
        // }), 
        // builder.addCase(userLogin.rejected, (state, action) => {
        //     state.isError = action.payload as MyError; 
        // }), 
        // builder.addCase(userLogin.fulfilled, (state, action) => {
        //     state.userInfo = action.payload; 
        //     state.isLoading = false; 
        //     state.userToken = action.payload.userToken; 
        // })
    }
})

export default authSlice.reducer; 