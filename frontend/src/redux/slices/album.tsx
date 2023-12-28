import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageData, CreateArgs, Album } from "@/type";


export interface AlbumState {
    page: number
    albums: Album[]
    isLoading: boolean
    limit: number
    more: boolean
}

const initialState: AlbumState = {
    page: 1,
    albums: [],
    isLoading: false,
    limit: 4,
    more: true
}

export const albumSlice = createSlice({
    name: "albumReducer",
    initialState,
    reducers: {
        updateSuccess(state, action) {
            let index = state.albums.filter((item, i) => item._id == action.payload._id)
            const i = state.albums.indexOf(index[0]);
            state.albums[i] = action.payload;
        },
        loadSuccess(state, action) {
            state.more = true
            state.page += 1;
            state.albums = [...state.albums, ...action.payload]
        },
        initialize(state, action) {
            state.more = true
            state.page = 1;
            state.albums = action.payload
        },
        limitSuccess(state) {
            state.more = false
        }
    }
})

export default albumSlice.reducer

export async function createAlbum(body: CreateArgs, page: number, limit: number, dispatch: any) {
    try {
        const { authtoken } = body
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/create-blog/${page}/${limit}`,
            {
                name: body.name,
                image: body.image,
                owner: body.owner
            },
            {
                headers: {
                    authtoken
                }
            }
        )
        if (res) {
            const payload = res.data;
            dispatch(albumSlice.actions.initialize(payload))
        }
    } catch (err) {
        throw err
    }
}

export async function initAlbums(page: number, limit: number, dispatch: any) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/blogs/${page}/${limit}`,
            {}
        )
        if (res) {
            const payload = res.data;
            dispatch(albumSlice.actions.initialize(payload))
        }
    }
    catch (error) {
        throw error
    }
}


export async function updateAlbum(body: CreateArgs, id: string, flag: boolean, dispatch: any) {
    try {
        const { authtoken } = body
        const res = await axios.put(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/blog/${id}/${flag}`,
            {
                name: body.name,
                image: body.image,
                owner: body.owner
            },
            {
                headers: {
                    authtoken
                }
            }
        )
        if (res) {
            const payload = res.data;
            console.log(payload, "++++++++++")
            dispatch(albumSlice.actions.updateSuccess(payload))
        }
    } catch (error) {
        throw error
    }
}


export async function deleteAlbum(id: string, authtoken: string, dispatch: any) {
    try {
        await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/blog/${id}`,
            {},
            {
                headers: {
                    authtoken
                }
            }
        )
        console.log("success")
    } catch (error) {
        throw error
    }
}

export async function loadMoreAlbums(page: number, limit: number, dispatch: any) {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_API_URL}/blogs/${page + 1}/${limit}`,
            {},
        )
        if (res) {
            const payload = res.data;
            if (payload.length == 0) { dispatch(albumSlice.actions.limitSuccess()) }
            else dispatch(albumSlice.actions.loadSuccess(payload))
        }
    } catch (error) {
        throw error
    }
}