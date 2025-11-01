import React from 'react'

const UploadImageModal = () => {
    return (
        <div className='w-fit'>
            <button className="btn rounded-xl" onClick={()=>document.getElementById('my_modal_2').showModal()}>Upload</button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">
                        Upload Image
                    </h3>
                    
                    <form className='flex flex-col gap-2'>
                        <input type="file" className="file-input w-full" />

                        <button className='btn btn-ghost'>
                            Upload
                        </button>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default UploadImageModal;