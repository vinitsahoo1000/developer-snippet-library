import { AuthSignup } from "@/components/AuthSignup";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: 'Signup'
};

export default function Signup() {
    return(
        <>
        <Head>
        <title>Signup</title>
        </Head>
        <div>
            <AuthSignup/>
        </div>
        </>
    )
}