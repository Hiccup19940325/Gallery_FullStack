
import Image from "next/image"

interface Props {
    url: string
    show: boolean
    handleClose: () => void
}

const ViewModal: React.FC<Props> = ({ url, show, handleClose }) => {
    return (
        <>
            {show && <div className="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
                    <div className="relative flex flex-col min-h-full items-start justify-center text-center sm:items-center sm:p-0">
                        <button onClick={handleClose} className="btn btn-sm btn-circle fixed right-20 top-10">✕</button>
                        <Image src={url}
                            alt="picture"
                            height={1000}
                            width={800}
                            loading="lazy"
                            className="rounded-2xl z-100"
                        />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default ViewModal