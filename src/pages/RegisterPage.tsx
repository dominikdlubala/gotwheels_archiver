import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAddUserMutation } from "../store";

export default function RegisterPage() {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const navigate = useNavigate(); 
    const [addUser, { isLoading: isAdding }] = useAddUserMutation(); 


    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        await addUser({username, password}); 
        navigate('/'); 
    }
    
    return (
        <div> 
            Register a new user
            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input value={username} onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
                <label>Password</label>
                <input 
                    value={password}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                />
                <button type="submit" disabled={isAdding}>Submit</button>
            </form>
        </div>
    )
}