"use client"

import { Album, ImageData } from "@/type"
import Resizer from 'react-image-file-resizer'
import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import useAlbum from "@/hook/useAlbum"
import Notification from "../common/Notification"

interface Props {
    info: Album
    show: boolean
    handleClose: () => void

}

const EditModal: React.FC<Props> = ({ info, handleClose, show }) => {

    const { token, email } = useSelector((state: RootState) => state.auth)

    const [updatedImg, setUpdatedImg] = useState('')
    const [updatedName, setUpdatedName] = useState('')
    const [loading, setLoading] = useState(false)

    const { update } = useAlbum();

    useEffect(() => {
        setUpdatedImg(info.image.url);
        setUpdatedName(info.name)
    }, [info.image, info.name])



    const handleSubmit = useCallback(async () => {
        try {
            setLoading(true)
            const params = {
                authtoken: token,
                name: updatedName,
                image: updatedImg,
                owner: email,
            }
            await update(params, info._id, info.image.url == updatedImg);
            setLoading(false)
            handleClose();
            Notification("success", "Update Success!")
        } catch (error) {
            Notification("error", (error as Error).message)
        }
    }, [token, updatedImg, updatedName, email, handleClose, update, info])

    const handleResize = useCallback(async (e: any) => {
        console.log(e)
        e.preventDefault()
        let file = e.target.files;
        if (file) {
            try {
                Resizer.imageFileResizer(file[0], 720, 720, 'JPEG', 100, 0, (uri) => {
                    setUpdatedImg(String(uri))
                })
            } catch (error) {
                Notification("error", (error as Error).message)
            }
        }
    }, [])

    const handleCloseModal = useCallback(() => {
        setUpdatedImg(info.image.url)
        setUpdatedName(info.name)
        handleClose()
    }, [handleClose, info])

    return (
        <>
            {show && < div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-5" id="modal-title">Edit Album</h3>
                                    <div className="mt-2">
                                        <div className="flex flex-row justify-between items-start gap-5" >
                                            <div className="flex flex-col justify-between items-center gap-2">
                                                {
                                                    updatedImg ? <Image src={updatedImg} width={200} height={200} alt="image" className="w-[200px] border rounded-lg" />
                                                        : <div className="w-[200px] h-[200px] border rounded-lg"></div>}                                                {updatedImg ? <button onClick={() => setUpdatedImg('')} className="outline-none text-red-500">remove</button>
                                                            : <label className="cursor-pointer">
                                                                <span>upload</span>
                                                                <input type="file" className="sr-only" onChange={handleResize} />
                                                            </label>}
                                            </div>
                                            <div className="flex flex-col justify-between items-center">
                                                <div className="flex flex-col justify-center items-start gap-1">
                                                    <label>owner:</label>
                                                    <input value={email} disabled type="text" placeholder="Type name" className="input input-bordered input-primary w-full max-w-xs" onChange={e => setUpdatedName(e.target.value)} />
                                                </div>
                                                <div className="flex flex-col justify-center items-start gap-1">
                                                    <label>name:</label>
                                                    <input value={updatedName} type="text" placeholder="Type name" className="input input-bordered input-primary w-full max-w-xs" onChange={e => setUpdatedName(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" onClick={handleCloseModal} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Cancel</button>
                                            <button type="button" disabled={updatedImg == '' && updatedName == ''} onClick={handleSubmit} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                {loading ?
                                                    <span className="loading loading-dots loading-lg"></span> :
                                                    <span>Submit</span>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default EditModal