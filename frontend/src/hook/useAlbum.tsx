"use client"

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CreateArgs } from "@/type";
import { createAlbum, initAlbums, updateAlbum, deleteAlbum, loadMoreAlbums } from "@/redux/slices/album";
import { useCallback } from "react";

export default function useAlbum() {
    const dispatch = useDispatch()

    const albums = useSelector((state: RootState) => state.albums);

    const initLoad = useCallback(async () => {
        await initAlbums(1, albums.limit, dispatch)
    }, [albums.limit, dispatch]);

    const create = useCallback(async (args: CreateArgs) => {
        await createAlbum(args, 1, albums.limit, dispatch)
    }, [dispatch, albums.limit]);

    const update = useCallback(async (args: CreateArgs, id: string, flag: boolean) => {
        await updateAlbum(args, id, flag, dispatch)
    }, [dispatch]);

    const deleteItem = useCallback(async (id: string, authtoken: string) => {
        await deleteAlbum(id, authtoken, dispatch)
    }, [dispatch]);

    const loadMore = useCallback(async () => {
        await loadMoreAlbums(albums.page, albums.limit, dispatch)
    }, [albums.page, albums.limit, dispatch])

    return {
        albums,
        create,
        initLoad,
        update,
        deleteItem,
        loadMore,
    }
}