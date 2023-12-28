import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { auth } from '@/firebase'
import useAuth from "@/hook/useAuth"

interface Props {
    children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch();

    const { tokenCheck } = useAuth()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            console.log(user)
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log("User=>", user)
                tokenCheck(idTokenResult.token)
            }
        })
        return () => unsubscribe()
    }, [tokenCheck, dispatch])

    return (
        <>{children}</>
    )
}

export default AuthProvider