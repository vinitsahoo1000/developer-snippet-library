"use server"

import prisma from "@/db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Snippet } from "./snippet";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

interface DecodedToken {
    userId?: string;
    email?: string;
}

export interface User {
    id: string;             // Unique identifier for the user
    name: string;           // Name of the user
    email: string;          // Unique email address of the user
    password: string;       // The password hash used for authentication
    snippets: Snippet[];    // Array of Snippets related to the user
    createdAt: Date;        // Timestamp when the user was created
    updatedAt: Date;        // Timestamp when the user was last updated
}


export interface ActionResponse {
    success?: boolean;
    token?: string;
    message?: string;
    error?: string;
    status?: number;
}

interface UserDetailsResponse extends ActionResponse {
    id?: string;
    name?: string;
    email?: string;
}


export async function signup(formData: FormData):Promise<ActionResponse>  {
    try{
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!name || !email || !password) {
            return { error: "Name, email, and password are required!", status: 400 };
        }

        const existingUser = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            return { error: "Email already exists!", status: 409 };
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })
        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET ,{ expiresIn: "7d" });
        
        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax", 
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return ({success: true,message: "User signup succesful",token})
    }catch(error:unknown){
        return { error: `Error: ${error instanceof Error ? error.message : String(error)}`, status: 500 };
    }
}


export async function login(formData: FormData):Promise<ActionResponse> {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { error: "Email and password are required!", status: 400 };
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { error: "User not found!", status: 404 };
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Invalid credentials!", status: 401 };
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET,{ expiresIn: "7d" });
        
        (await cookies()).set("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax", 
            path: "/",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        return ({success: true,message: "User login succesful",token})
    } catch (error: unknown) {
        return { error: `Error: ${error instanceof Error ? error.message : String(error)}`, status: 500 };
    }
}


export async function userdetails():Promise<UserDetailsResponse> {
    try{
        const token = (await cookies()).get("token")?.value;

        if(!token){
            window.location.href = "/login"
            return({success:false,message:"User not logged in"})
        }

        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;

        if (!decoded?.userId) {
            throw new Error("Invalid token");
        }
        
        const user = await prisma.user.findUnique({
            where:{
                id: decoded.userId
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            throw new Error("User not found");
        }

        return { success: true,message: "User details fetched successfully", token, ...user };
    }catch(error:unknown){
        return { error: `Error: ${error instanceof Error ? error.message : String(error)}`, status: 500 };
    }
}


export async function logout() {
    try {
        (await cookies()).set("token", "", { expires: new Date(0) }); // Remove token cookie
        
        return { success: true, message: "User logged out successfully" };
    } catch (error: unknown) {
    return{ error: `Error: ${error instanceof Error ? error.message : String(error)}`, status: 500 }
        
    }
}