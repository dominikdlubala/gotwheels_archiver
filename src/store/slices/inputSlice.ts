import { createSlice } from '@reduxjs/toolkit'; 
import type { PayloadAction } from '@reduxjs/toolkit'; 

const inputSlice = createSlice({
    name: 'input', 
    initialState: {
        value: ''
    }, 
    reducers: {
        changeValue: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { changeValue } = inputSlice.actions;
export default inputSlice;  