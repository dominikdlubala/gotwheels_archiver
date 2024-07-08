import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks'; 
import { changeValue } from '../../store'; 

interface InputProps {
    id: string
    label: string
}

const Input = ( { id, label }: InputProps ) => {

    const value = useAppSelector((state) => state.input.value); 
    const dispatch = useAppDispatch(); 

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(changeValue(e.currentTarget.value))
    }

    return (
        <div className="form-group">
            <label>{label}</label>
            <input id={id} value={value} onChange={handleChange} />
        </div>
    ); 
}

export default Input; 