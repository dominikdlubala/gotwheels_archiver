import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import type { User } from '../types/types.ts';
import { faker } from '@faker-js/faker'; 
import {  useAddUserMutation } from '../store'; 

type FormValues = {
    email: string; 
    username: string;
    password: string; 
}

export default function RegisterPage() {

    const navigate = useNavigate(); 

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>(); 
    
    const [addUser] = useAddUserMutation(); 
    
    const onSubmit = async (data: FormValues) => {
        const user: User = { 
            id: faker.string.uuid(), 
            ... data
        }
        try {
            const { error } = await addUser({user, username: data.username}); 
            // do poprawienia
            console.log(error); 
            if(!error){
                navigate('/'); 
            }
        } catch (err) {
            console.error('Blad', err); 
        }
    } 

    return (
        <div className="page-container">
            <div className="form-container"> 
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title">Register a new user</h1>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input 
                            className="form-input"
                            type="email"
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
                        <label>Username</label>
                        <input 
                            className="form-input"
                            type="text"
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
                        <label>Password</label>
                        <input 
                            className="form-input"
                            type="password"
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
            </div>
        </div>
    )
}