import { AuthLogin } from "@/components/AuthLogin";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: 'Login'
};

export default function Login(){
    return(
        <>
        <Head>
        <title>Login</title>
        </Head>
        <div>
            <AuthLogin/>
        </div>
        </>
    )
}