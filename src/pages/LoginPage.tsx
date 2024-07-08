import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth'; 
import { useFetchUsersQuery } from '../store';
import Form from '../components/form/Form'; 

export default function LoginPage() {

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [isValid, setIsValid] = useState(true); 

    const { login } = useAuth(); 
    const { data, isLoading, isError } = useFetchUsersQuery(null); 

    const navigate = useNavigate(); 

    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault(); 
        const foundUser = data?.find(user => user.username == username); 
        if(!foundUser){
            setIsValid(false); 
        } else if (foundUser.password != password){
            setIsValid(false)
        } else if (foundUser.password == password){
            setIsValid(true); 
            await login(foundUser); 
        }
    } 

    return (
        <div className="page-container">
            <div className="form-container login-container">

                <Form />


                {/* <form className="form login-form" onSubmit={handleFormSubmit}>
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
                    {
                        isValid
                        ||
                        <span className="input-validate">Provided username and password are incorrect</span>
                    }
                    <button className="btn-submit" type="submit">Submit</button>
                </form> */}
                <div className="login-register">
                    Not yet our user?
                    <a onClick={() => navigate('/register')}>Sign up</a> 
                </div>
            </div>
        </div>
    )
}