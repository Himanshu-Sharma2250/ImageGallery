import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import {Loader2} from "lucide-react";

import { useAlbumStore } from "../stores/useAlbumStore";

const CreateAlbumModal = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const {isCreatingAlbum, createAlbum} = useAlbumStore();

    const on_submit = async (data) => {
        const result = await createAlbum(data);
        
        document.getElementById("albumForm").reset(); // to reset the default values of input to ""

        if (result) {
            document.getElementById('my_modal_1').close()
        }
    };

    return (
        <div className='w-fit'>
            <button className="btn rounded-xl btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl" onClick={()=>document.getElementById('my_modal_1').showModal()}>
                Create Album
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-2.5">
                        Create Album    
                    </h3>

                    <div className='flex items-center justify-center'>
                        <form onSubmit={handleSubmit(on_submit)} id="albumForm">
                            <fieldset className="fieldset border-base-300 rounded-box w-xs p-4">
                                <label className="label">Name</label>
                                <input type="text" {...register('name')}  className="input" placeholder="Enter album name" />

                                <label className="label">Desciption</label>
                                <textarea {...register("description")}  className="textarea" placeholder="Enter desciption (optional)"></textarea>

                                {/* button to submit and to close it when submitted */}
                                <button className="btn btn-neutral mt-4" type="submit" onClick={() => {document.getElementById('my_modal_1').close()}}>
                                    {isCreatingAlbum === true ? (
                                        <Loader2 className="w-4 animate-spin" />
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </fieldset>
                        </form>
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