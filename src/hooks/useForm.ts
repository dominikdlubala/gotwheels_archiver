import { useEffect } from 'react'; 
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { inputChange } from '../store'; 

interface InitialInputState {
    [key: string]: {
        value: string; 
    }
} 

export const useForm = (initialInputs: InitialInputState): [InitialInputState, (event: React.FormEvent<HTMLInputElement>) => void] => {
    const dispatch = useAppDispatch(); 
    const formState = useAppSelector( state => state.form.inputs); 

    useEffect(() => {
        Object.keys(initialInputs)
            .forEach((inputId) => {
                dispatch(inputChange({inputId, value:initialInputs[inputId].value}));
            });
    }, [dispatch, initialInputs]); 

    const inputHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const { id, value } = event.currentTarget; 
        dispatch(inputChange({inputId: id, value})); 
    }; 

    return [formState, inputHandler]; 
}

