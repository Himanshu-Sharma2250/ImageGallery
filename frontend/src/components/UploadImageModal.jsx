import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

import useImageStore from '../stores/useImageStore';

const UploadImageModal = () => {
    const {uploadedImageDetail, isUploadingImage, upload} = useImageStore();
    const {handleSubmit} = useForm();
    
    
    const on_submit = async () => {
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        
        const formData = new FormData();
        formData.append('image', file); 
        
        const result = await upload(formData);

        if (result) {
            toast.success("Image uploaded successfully");
        }
        else {
            toast.error("Unable to upload image");
        }
    }

    console.log("IMage detail : ", uploadedImageDetail);

    return (
        <div className='w-fit'>
            <button className="btn rounded-xl" onClick={()=>document.getElementById('my_modal_2').showModal()}>Upload</button>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-5">
                        Upload Image
                    </h3>
                    
                    <form className='flex flex-col gap-2' encType="multipart/form-data" onSubmit={handleSubmit(on_submit)}>
                        <input type="file" className="file-input w-full" name='image' />

                        <button className='btn btn-ghost' type="submit">
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