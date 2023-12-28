import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"

export interface AuthState {
    name: string
    email: string
    token: string
    role: string
    id: string
}


const initialState: AuthState = {
    name: '',
    email: '',
    token: '',
    role: '',
    id: ''
}

export const authSlice = createSlice({
    name: "authValidation",
    initialState,
    reducers: {
        authSuccess(state, action) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.role = action.payload.role;
            state.id = action.payload.id;
        },

        logoutSuccess(state) {
            state.name = '';
            state.email = '';
            state.token = '';
            state.role = '';
            state.id = '';
        }
    }
})

export default authSlice.reducer

export async function currentUser(authtoken: string, dispatch: any) {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/current-user`,
            {},
            {
                headers: {
                    authtoken,
                }
            }
        )

        if (res) {
            const payload: AuthState = {
                name: res.data.name,
                email: res.data.email,
                token: authtoken,
                role: res.data.role,
                id: res.data._id
            }
            dispatch(authSlice.actions.authSuccess(payload))
        }
        return true
    } catch (error) {
        throw error
    }
}

export async function logIn(authtoken: string, dispatch: any) {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/create-or-update-user`,
            {},
            {
                headers: {
                    authtoken,
                }
            }
        )
        if (res) {
            console.log(res.data, "+++++++++++")
            const payload = {
                name: res.data.name,
                email: res.data.email,
                token: authtoken,
                role: res.data.role,
                id: res.data._id,
            }
            dispatch(authSlice.actions.authSuccess(payload))
        }
        return true
    } catch (error) {
        throw error
    }
}

export async function SignOut(dispatch: any) {
    try {
        await signOut(auth)
        dispatch(authSlice.actions.logoutSuccess())
    } catch (error) {
        throw error
    }
}