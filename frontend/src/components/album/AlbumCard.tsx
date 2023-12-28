
"use client"

import Image from "next/image"
import { Album } from "@/type"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { Suspense, useState } from "react"
import ViewModal from "./viewModal"
import EditModal from "./EditModal"
import DeleteModal from "./deleteModal"
import Loading from "@/app/loading"

interface Props {
    info: Album
}


const AlbumCard: React.FC<Props> = ({ info }) => {
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const { email } = useSelector((state: RootState) => state.auth)
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="w-full h-[200px] overflow-hidden">
                <Image src={info.image.url} width={300} height={300} priority={true} className="w-full" alt="Shoes" />
            </figure>
            <div className="card-body flex flex-col justify-between items-center">
                <h2 className="card-title text-center">{info.name}</h2>
                <div className="flex flex-row gap-1">
                    {email == info.owner && <button onClick={() => setEdit(true)} className="btn btn-info ">edit</button>}
                    <button onClick={() => setView(true)} className="btn">view</button>
                    {email == info.owner && <button onClick={() => setDeleteModal(true)} className="btn btn-error">delete</button>}
                </div>
            </div>
            <ViewModal url={info.image.url} show={view} handleClose={() => setView(false)} />
            <EditModal info={info} show={edit} handleClose={() => setEdit(false)} />
            <DeleteModal info={info} show={deleteModal} handleClose={() => setDeleteModal(false)} />
        </div>
    )
}

export default AlbumCard