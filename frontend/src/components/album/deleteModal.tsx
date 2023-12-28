
import { Album } from "@/type"
import React, { useCallback } from "react"
import useAlbum from "@/hook/useAlbum"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useState } from "react"
import Notification from "../common/Notification"

interface Props {
    info: Album
    show: boolean
    handleClose: () => void
}

const DeleteModal: React.FC<Props> = ({ info, handleClose, show }) => {

    const { deleteItem, initLoad } = useAlbum();
    const { token } = useSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState(false)

    const handleDelete = useCallback(async () => {
        try {
            setLoading(true)
            await deleteItem(info._id, token)
            await initLoad()
            setLoading(false)
            handleClose()
            Notification("success", "Delete Success!")
        } catch (error) {
            Notification("error", (error as Error).message)
        }
    }, [deleteItem, info._id, initLoad, token, handleClose])

    return (
        <>
            {show && < div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900 mb-5" id="modal-title">Delete Album</h3>
                                    <div className="mt-2">
                                        <div className=" py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button type="button" onClick={handleClose} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto text-center">Cancel</button>
                                            <button type="button" onClick={handleDelete} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                                {loading ?
                                                    <span className="loading loading-dots loading-lg"></span> :
                                                    <span>Ok</span>}
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

export default DeleteModal