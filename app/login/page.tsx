import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Partner Login"
}

export default function Login() {
    
    return (
        <main>
            <section className="min-h-screen grid items-center justify-center">
                <div className="bg-card border text-card-foreground shadow-md rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-4">Partner Login</h1>
                    <Suspense>
                        <LoginForm />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}