import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

type SliceState = {
    inputs: {
        [key: string]: {
            value: string;
        }
    }
}

interface InputCHangePayload {
    inputId: string, 
    value: string
}

const formSlice = createSlice({
    name: 'form', 
    initialState: <SliceState> {inputs: {}}, 
    reducers: {
        inputChange: (state, action: PayloadAction<InputCHangePayload>) => {
            const {inputId, value} = action.payload; 
            state.inputs[inputId] = {value}; 
        }
    }
})

export const { inputChange } = formSlice.actions; 
export default formSlice;  