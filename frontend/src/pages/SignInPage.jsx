import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import {Link, useNavigate} from "@tanstack/react-router";
import toast from "react-hot-toast";

import { useAuthStore } from "../stores/useAuthStore";

const loginSchema = z.object({
    email: z
        .email({message: "Enter a valid email"})
        .trim(),

    password: z
        .string()
        .min(8, {message: "Minimum length of password should be 8"})
        .max(13, {message: "Maximum lenght of password is 13"})
});

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {isLoggingIn, login} = useAuthStore();

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
        try {
            const result = await login(data);

            if (result) {
                navigate({to:"/", from:"/signin"})
            }
        } catch (error) {
            console.error("Signin Failed : ", error);
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-col">
                {/* Logo */}
                <div className="text-center lg:text-center">
                    <h1 className="text-5xl font-bold">Welcome Back</h1>
                    <p className="py-6">
                        Login to your account
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <fieldset className="fieldset">
                                {/* Email */}
                                <label className="floating-label">
                                    <span className="label-text font-medium">Email</span>
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

                                <button 
                                    type="submit"
                                    className="btn btn-primary w-full"
                                    disabled={isLoggingIn}
                                >
                                    {isLoggingIn ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </fieldset>
                        </form>

                        {/* footer */}
                        <div className="text-center">
                            <p>
                                Don't have an account?{" "}
                                <Link to={"/signup"} className="link link-primary">
                                    register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SignInPage;