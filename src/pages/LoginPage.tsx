import { useNavigate } from 'react-router-dom'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebaseSetup'; 

type FormValues = {
    email: string; 
    password: string; 
}

export default function LoginPage() {
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();  

    const onSubmit: SubmitHandler<FormValues> = ({ email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log(email)
            })
            .catch(error => {
                if(error.code === 'auth/invalid-email') {
                    setError('email', { type: 'manual', message: 'E-mail is inavlid' }); 
                } else if (error.code === 'auth/invalid-credential') {
                    setError('email', { type: 'manual', message: 'Provided credentials are invalid' })
                }
            })
    }

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
                            <input 
                                className="form-input"
                                type="text"
                                placeholder="E-mail"
                                {...register("email", {
                                    required: {
                                        value: true, 
                                        message: 'E-mail is required'
                                    }
                                })}
                            />
                        </div>
                        <div className="form-group"> 
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
                            ( errors.email || errors.password )
                            &&
                            <span className="input-validate">{errors.email?.message || errors.password?.message} </span>
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