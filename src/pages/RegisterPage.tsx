import { useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import { useAddUserMutation } from "../store";

type FormValues = {
    email: string; 
    password: string; 
}

export default function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();  
    
    const onSubmit = (data: FormValues) => {
        console.log(data); 
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