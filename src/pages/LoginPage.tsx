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
        const foundUser = data?.find(user => user.username === username); 
        if(!foundUser){
            alert('Nie ma takiego uzytkownika, sprawdź poprawność wpisanych danych lub zarejestruj się jako nowy użytkownik')
        } else if(foundUser.password === password) {
            await login(foundUser); 
        }
    } 

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Username</label>
                <input value={username} onChange={(e: React.FormEvent<HTMLInputElement>) => setUsername(e.currentTarget.value)} />
                <label>Password</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}