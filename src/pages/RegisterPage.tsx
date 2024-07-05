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
        <div className="form-container"> 
            <form className="form" onSubmit={handleFormSubmit}>
                <h1 className="form-title">Register a new user</h1>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        className="form-input"
                        value={username} 
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        className="form-input"
                        value={password}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <button className="btn-submit" type="submit" disabled={isAdding}>Submit</button>
            </form>
        </div>
    )
}