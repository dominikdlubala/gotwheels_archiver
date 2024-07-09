import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import axios from 'axios'; 
import { useAuth } from '../hooks/useAuth'; 
import { useFetchUsersQuery } from '../store';

import type { User } from '../types/userType'; 
import { dbUrl } from '../firebaseSetup'; 

type FormValues = {
    username: string; 
    password: string; 
}

export default function LoginPage() {

    const navigate = useNavigate(); 

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();  

    const onSubmit: SubmitHandler<FormValues> = (data) => {
            console.log(data); 
    }


    const getUser = async (data: User) => {
        const response = await axios.get(``)
    }



    return (
        <div className="page-container">
            <div className="form-container login-container">
                {/* {
                    isError 
                    &&
                    <span className="input-validate">There was an error with our database, try again later</span>
                } */}
                <form className="form login-form" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title">Log in</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            className="form-input"
                            type="text"
                            {...register("username", {
                                required:true
                            })}
                        />
                    </div>
                    <div className="form-group"> 
                        <label>Password</label>
                        <input 
                            className="form-input"
                            type="password"
                            {...register("password", {
                                required: true, 
                            })}
                        />
                    </div>
                    {
                        ( errors.username || errors.password )
                        &&
                        <span className="input-validate">Provided username or password are incorrect</span>
                    }
                    <button className="btn-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
                </form>
                <div className="login-register">
                    Not yet our user?
                    <a onClick={() => navigate('/register')}>Sign up</a> 
                </div>
            </div>
        </div>
    )
}