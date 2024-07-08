import { useSelector, useDispatch } from 'react-redux'; 

interface InputProps {
    label: string
}

const Input = ( { label }: InputProps ) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input  />
        </div>

    ); 
}

export default Input; 