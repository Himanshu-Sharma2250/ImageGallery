import { useState } from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {Link, useNavigate} from "@tanstack/react-router";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {z} from "zod";

import { useAuthStore } from '../stores/useAuthStore';

const registerUserSchema = z.object({
    username: z
        .string()
        .trim()
        .min(4, {message: "Minimum length of username should be 3"})
        .max(20, {message: "Maximum length of username is 20"}),
    
    email: z
        .email({message: "Enter a valid email"})
        .trim(),

    password: z
        .string()
        .min(8, {message: "Minimum length of password should be 8"})
        .max(13, {message: "Maximum lenght of password is 13"})
});

const SignUpPage = () => {
    const navigate = useNavigate({from:"/signup"});
    const [showPassword, setShowPassword] = useState(false);

    const {signup, isSigningUp} = useAuthStore();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(registerUserSchema)
    })

    const onSubmit = async (data) => {
        try {
            const success = await signup(data);
            if (success) {
                navigate({to:"/"});
            }
        } catch (error) {
            console.error("Sign up failed: ", error);
        }
    }

    return (
        <div className='hero bg-base-200 min-h-screen'>
            <div className="hero-content text-center">
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                            <legend className="fieldset-legend">Register</legend>

                            {/* Username */}
                            <label className="floating-label">
                                <span>Username</span>
                                <input type="text" {...register("username")} className="input validator" required placeholder="Username" 
                                    pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
                            </label>

                            {/* Email */}
                            <label className="floating-label">
                                <span>Email</span>
                                <input className="input validator" type="email" {...register("email")} required placeholder="mail@site.com" />
                            </label>

                            {/* Password */}
                            <label className="floating-label">
                                <span>Password</span>
                                <input type={showPassword ? "text" : "password"} {...register("password")} className="input validator" required placeholder="Password" minlength="8" 
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
                                />
                                <button
                                    type='button'
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className='h-5 w-5 text-base-content/40'/>
                                    ) : (
                                        <Eye className='h-5 w-5 text-base-content/40'/>
                                    )}
                                </button>
                            </label>

                            {/* submit button */}
                            <button type='submit' className="btn btn-neutral mt-4" disabled={isSigningUp}>
                                {isSigningUp? (
                                    <>
                                        <Loader2 className='h-5 w-5 animate-spin'/>
                                        Loading...
                                    </>
                                ) : (
                                    "Register"
                                )}
                            </button>
                        </fieldset>
                    </form>

                    {/* footer */}
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account?{" "}
                            <Link to={"/signin"} className='link link-primary'>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignUpPage;