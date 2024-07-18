import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 

import { useAuth } from '../hooks/useAuth'; 
import { useFetchUserByUsernameQuery } from '../store';


type FormValues = {
    username: string; 
    password: string; 
}

export default function LoginPage() {

    const [fetchParams, setFetchParams] = useState<null | { username: string, password: string}>(null);

    const navigate = useNavigate(); 
    const { login } = useAuth(); 

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();  

    const onSubmit: SubmitHandler<FormValues> = ({ username, password}) => {
        setFetchParams({username, password}); 
    }
    
    // check if good
    const { data, error } = useFetchUserByUsernameQuery(fetchParams?.username || ''); 
    
    useEffect(() => {
        if(fetchParams && data) {
            if(data.password !== fetchParams.password)  {
                setError('password', { type: 'manual', message: 'Incorrect password'} )
            } else {
                login(data); 
            }
        } else if (fetchParams && error) {
            setError('username', { type: 'manual', message: 'Username does not exist'}); 
        }
    }, [data, error, fetchParams, navigate, setError, login]); 

    return (
        <div className="page-container">
            <div className="page-wrapper">
                <div className="form-container login-container">
                    {/* {
                        isError 
                        &&
                        <span className="input-validate">There was an error with our database, try again later</span>
                    } */}
                    <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="form-title">Log in</h1>
                        <div className="form-group">
                            {/* <label>Username</label> */}
                            <input 
                                className="form-input"
                                type="text"
                                placeholder="Username"
                                {...register("username", {
                                    required: {
                                        value: true, 
                                        message: 'Username is required'
                                    }
                                })}
                            />
                        </div>
                        <div className="form-group"> 
                            {/* <label>Password</label> */}
                            <input 
                                className="form-input"
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: {
                                        value: true, 
                                        message: 'Password is required'
                                    } 
                                })}
                            />
                        </div>
                        {
                            ( errors.username || errors.password )
                            &&
                            <span className="input-validate">{errors.username?.message || errors.password?.message} </span>
                        }
                        <button className="btn-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                    </form>
                    <div className="login-register">
                        Not yet our user?
                        <a onClick={() => navigate('/register')}>Sign up</a> 
                    </div>
                </div>
            </div>
        </div>
    )
}