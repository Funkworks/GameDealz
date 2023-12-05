'use client'

import styles from "./page.module.css";
import supabase from "@/lib/supabase"
import { useState } from "react";
import { useRouter } from 'next/navigation'

export default function Page(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter()

    const createAccount = async (e) => {
        e.preventDefault()
        if(password !== confirmPass){
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if(!error){
            const { data, error } = await supabase.from('users')
            .update({ username: username })
            .eq('email', email)
            if(!error){
                router.push("/")
            } else{
                console.log(error)
            }
        } else {
            setErrorMsg("Email taken/password not strong enough, idk")
            setTimeout(() => {setErrorMsg("")}, 3000)
            console.log(error)
        }
    }

    return(
        <main>
            <div><a href='../'>Home</a></div>
            <div className={styles.signInBox}>
                <h1>Create account</h1>
                <div>
                    <form onSubmit={createAccount}>
                        <div>
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="confirm password"
                                onChange={(e) => setConfirmPass(e.target.value)}
                            />
                        </div>
                        <p>{errorMsg}</p>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </main>
    )
}