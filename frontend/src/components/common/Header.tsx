"use client"

import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import useAuth from "@/hook/useAuth"
import { useCallback } from "react"

const Header = () => {
    const auth = useSelector((state: RootState) => state.auth)

    const { logOut } = useAuth()

    const handleLogOut = useCallback(async () => {
        try {
            await logOut();
        } catch (error) {
            throw error
        }
    }, [logOut])
    return (
        <div className="navbar bg-base-100 rounded-xl sticky top-2 z-20 mx-auto">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Gallery</Link>
            </div>
            <div className="hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/signUp">Register</Link></li>
                    <li>
                        {auth.name ? <details>
                            <summary>
                                {auth.name}
                            </summary>
                            <ul className="bg-base-100 rounded-t-none">
                                <li className="float-right"><button onClick={handleLogOut}>LogOut</button></li>
                            </ul>
                        </details>
                            : <Link href="/signIn">SignIn</Link>}</li>
                </ul>
            </div>
            <div className="md:hidden flex-none">
                <div className="dropdown dropdown-bottom dropdown-end">
                    <button tabIndex={0} className="btn m-1">
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li><Link href="/signUp">Register</Link></li>
                        {auth.name ? <li className="float-right"><button onClick={handleLogOut}>LogOut</button></li>
                            : <li><Link href="/signIn">SignIn</Link></li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header