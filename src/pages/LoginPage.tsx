import { useState } from 'react'; 
import { useAuth } from '../hooks/useAuth'; 
import { useFetchUsersQuery } from '../store';

export default function LoginPage() {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 

    const { login } = useAuth(); 
    const { data, isLoading, isError } = useFetchUsersQuery(null); 

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        const foundUser = data?.find(user => user.username == username); 
        if(!foundUser){
            alert('Nie ma takiego uzytkownika, sprawdź poprawność wpisanych danych lub zarejestruj się jako nowy użytkownik')
        } else if(foundUser.password == password) {
            await login(foundUser); 
        }
    } 

    return (
        <div className="form-container login-container">
            <form className="form login-form" onSubmit={handleFormSubmit}>
                <h1 className="form-title">Log in</h1>
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
                        type="password"
                        value={password}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                    />
                </div>
                <button className="btn-submit" type="submit">Submit</button>
            </form>
        </div>
    )
}