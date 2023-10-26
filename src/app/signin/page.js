'use client'

import styles from "./page.module.css";
import supabase from "@/lib/supabase"
import { useRouter } from 'next/navigation'
import { useState } from "react";

export default function Page(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const signin = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        
        if(!error){
            console.log(`Signed in with ${data}`)
            router.push("/")
        }
    }

    return(
        <main>
            <div><a href='../'>Home</a></div>
            <div className={styles.signInBox}>
                <h1>Sign In</h1>
                <div>
                    <form onSubmit={signin}>
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <div><button><a href="../createaccount" rel="noopener noreferrer">Create an account</a></button></div>
                </div>
            </div>
        </main>
    )
}