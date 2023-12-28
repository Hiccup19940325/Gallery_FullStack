"use client"

import React, { useCallback, useState } from "react"
import useAuth from "@/hook/useAuth"
import { auth, googleAuthProvider } from "@/firebase"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import Notification from "@/components/common/Notification"
import Google from '@/assets/google.png'
import Image from "next/image"

const LogIn: React.FC = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()

    const handleComfirm = () => {
        if (password !== '' && password !== confirm) return false;
        else return true;
    }
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirm) alert("reconfirm the password")
        else {
            try {
                setLoading(true)
                const result = await createUserWithEmailAndPassword(auth, email, password);
                console.log(result)
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                console.log(idTokenResult.token)
                await login(idTokenResult.token);
                setLoading(false)
                Notification("success", "Signup Success!")
                router.push("/signIn");
            } catch (error) {
                setLoading(false)
                Notification("success", (error as Error).message)
            }
        }
    }, [email, password, router, login, confirm])

    const googleSignUp = useCallback(async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            const result = await signInWithPopup(auth, googleAuthProvider)
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            console.log(idTokenResult.token)
            await login(idTokenResult.token);
            setLoading(false)
            Notification("success", "Login Success!")
            router.push('/')
        } catch (error) {
            setLoading(false);
            Notification("error", (error as Error).message)
        }
    }, [login, router])

    return (
        <section>
            <div className="w-full border-[1px] border-slate-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:mx-auto p-10 rounded-lg md:w-[500px] flex flex-col justify-center items-center gap-5 sm:bg-gray-800">
                <div className="text-2xl text-white mt-5">Welcome Gallery</div>
                <button onClick={googleSignUp} className="border-[1px] border-slate-500 hover:bg-slate-700 rounded-lg w-full text-xl text-slate-300 hover:text-slate-100 hover:ring-4 ring-slate-700 shadow-xl mb-5 flex flex-row justify-center gap-3 py-2">
                    SignUp With
                    <Image src={Google} alt="google" />
                </button>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-[1px] bg-slate-500 border-0 rounded dark:bg-gray-700" />
                    <div className="absolute px-4 -translate-x-1/2 left-1/2 ">
                        <span className="text-slate-500 text-lg bg-gray-900 sm:bg-slate-800 px-2">or</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full justify-center items-start gap-4">
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-white">Email</label>
                        <input type="email" required value={email} className="text-white w-full border-[1px] border-slate-500 outline-none focus:border-blue-500 text-md rounded-lg p-2 bg-slate-700" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-white">Password</label>
                        <input type="password" required value={password} className="text-white w-full border-[1px] border-slate-500 outline-none focus:border-blue-500 text-md rounded-lg p-2 bg-slate-700" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-white">Confirm</label>
                        <input type="password" required value={confirm} className="text-white w-full border-[1px] border-slate-500 outline-none focus:border-blue-500 text-md rounded-lg p-2 bg-slate-700" placeholder="**********" onChange={(e) => setConfirm(e.target.value)} />
                    </div>
                    {!handleComfirm() && <span className="text-red-500 text-left">It is not matched</span>}
                    <button type="submit" className="bg-blue-600 text-white text-xl w-full rounded-lg p-1 shadow-xl hover:bg-blue-700 hover:border-black mt-5">
                        {loading ?
                            <span className="loading loading-dots loading-lg"></span> :
                            <span className="text-lg">Sign Up</span>}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default LogIn