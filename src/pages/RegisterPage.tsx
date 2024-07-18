import { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import type { User } from '../types/types.ts';
import { faker } from '@faker-js/faker'; 
import {  useAddUserMutation } from '../store'; 

type RegisterFormValues = {
    email: string; 
    username: string;
    password: string; 
}

export default function RegisterPage() {
    const [err, setErr] = useState<boolean>(false); 
    const navigate = useNavigate(); 

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>();
    
    const [addUser] = useAddUserMutation(); 
    
    const onSubmit = async (data: RegisterFormValues) => {
        const user: User = { 
            id: faker.string.uuid(), 
            ... data
        }
        try {
            const { error } = await addUser(user); 
            // do poprawienia
            setErr(error ? true : false); 
            if(!error){
                navigate('/'); 
            }
        } catch (err) {
            console.error('Blad', err); 
        }
    } 

    return (
        <div className="page-container">
            <div className="page-wrapper">
                <div className="form-container"> 
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="form-title">Register a new user</h1>
                        <div className="form-group">
                            <input 
                                className="form-input"
                                type="email"
                                placeholder="E-mail"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === " " && e.preventDefault() }
                                {...register("email", {
                                    required: "Email is required"
                                })}
                            />
                            {
                                errors.email && <span className="input-validate">{errors.email.message}</span>
                            }
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-input"
                                type="text"
                                placeholder="Username"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === " " && e.preventDefault() }
                                {...register("username", {
                                    required: true, 
                                    minLength: {
                                        value: 3, 
                                        message: "Username must be at least of length 3"
                                    }
                                })}
                            />
                            {
                                errors.username && <span className="input-validate">{errors.username.message}</span>
                            }
                            
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-input"
                                type="password"
                                placeholder="Password"
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === " " && e.preventDefault()}
                                {...register("password", {
                                    required: true, 
                                    minLength: {
                                        value: 6,
                                        message: "You must provide a password of at least 6 characters in length"
                                    } 
                                })}
                            />
                            {
                                errors.password && <span className="input-validate">{errors.password.message}</span>
                            }
                        </div>
                        <button className="btn-submit" type="submit" >Submit</button>
                    </form>
                    <div className="login-register">
                        Already a user?
                        <a onClick={() => navigate('/')}>Sign in</a> 
                    </div>
                    {
                        err
                        &&
                        <span className="input-validate">Error while adding user</span>
                    }
                </div>
            </div>
        </div>
    )
}