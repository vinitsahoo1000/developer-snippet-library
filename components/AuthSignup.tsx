"use client"

import { useState } from "react";
import { Button } from "./common/Button";
import { InputBox } from "./common/InputBox";
import { PasswordBox } from "./common/PasswordBox";
import { signup } from "@/app/actions/user";

export const AuthSignup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("password", formData.password);
        
        const response = await signup(data);
        
        if (response.success) {
            window.location.href = '/' 
        } else {
            alert(response?.error || "Something went wrong!");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4 pl-4">
            <InputBox autoComplete="name" onChange={handleChange} name="name" label="Name" placeholder="Enter Your Name..." />
            <InputBox autoComplete="email" onChange={handleChange} name="email" label="Email" placeholder="Enter Your Email..." />
            <PasswordBox onChange={handleChange} />
            <Button label={"Signup"}/>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
                Login
            </a>
            </p>
        </div>
        </div>
    );
};
