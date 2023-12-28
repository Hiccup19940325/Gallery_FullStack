import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import albumReducer from './slices/album'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        albums: albumReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch