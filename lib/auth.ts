// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // Set this in your .env file

export async function getUserFromToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("No token found");

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (error) {
        throw new Error("Invalid token");
    }
}
