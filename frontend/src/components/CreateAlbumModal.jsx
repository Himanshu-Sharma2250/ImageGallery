import React from 'react'

const CreateAlbumModal = () => {
    return (
        <div className='w-fit'>
            <button className="btn rounded-xl" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                Create Album
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-2.5">
                        Create Album    
                    </h3>

                    <div className='flex items-center justify-center'>
                        <fieldset className="fieldset border-base-300 rounded-box w-xs p-4">
                            <label className="label">Name</label>
                            <input type="text" className="input" placeholder="Enter album name" />

                            <label className="label">Desciption</label>
                            <textarea className="textarea" placeholder="Enter desciption (optional)"></textarea>

                            {/* button to submit and to close it when submitted */}
                            <button className="btn btn-neutral mt-4" onClick={() => {document.getElementById('my_modal_1').close()}}>
                                Submit
                            </button>
                        </fieldset>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default CreateAlbumModal;