import { currentUser, logIn, SignOut } from "@/redux/slices/auth"
import { RootState } from "@/redux/store"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function useAuth() {
    const dispatch = useDispatch()

    const auth = useSelector((state: RootState) => state.auth)

    const tokenCheck = useCallback(async (loginArgs: string) => {
        await currentUser(loginArgs, dispatch)
    }, [dispatch]);

    const login = useCallback(async (loginArgs: string) => {
        await logIn(loginArgs, dispatch)
    }, [dispatch])

    const logOut = useCallback(async () => {
        await SignOut(dispatch)
    }, [dispatch])

    return {
        auth,
        tokenCheck,
        login,
        logOut,
    }
}