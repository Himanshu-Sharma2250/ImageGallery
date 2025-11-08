import { useState } from 'react';
import toast from "react-hot-toast";

import useImageStore from '../stores/useImageStore';
import { Loader2 } from 'lucide-react';
import { useAlbumStore } from '../stores/useAlbumStore';

const AddImagesInAlbumModal = (prop) => {
    const {images} = useImageStore();
    const { addingImageInAlbum, isAddingImageInAlbum, albumDetail } = useAlbumStore();
    const [imageIdsMap, setImageIdsMap] = useState(new Map());

    const createImages = (image) => {
        return <div className='image-full h-40 w-32' key={image._id} data-key={image._id} onClick={isImageSelected}>
            <figure className='h-40 w-32'>
                <img src={image.image_url} className='h-40 w-32 rounded-xl' />
            </figure>
            <div className='card-body relative'>
                <input type="checkbox" className="checkbox absolute top-1.5 right-1" />
            </div>
        </div>
    }

    const isImageSelected = (e) => {
        const isSelected = e.target.checked // for the input checkbox. e.target is input type=checkbox. e.target is the element we clicked on
        // e.currentTarget is the parent of the clicked element, meaning if i click on input e.currentTarget will be div element outermost
        // console.log("image is selected? ", isSelected);
        // console.log("Parent of input check : ", e.currentTarget) // div with key

        console.log("images id map size: ", imageIdsMap.size);
        console.log("images id map: ", imageIdsMap);

        if (isSelected) {
            const imageId = e.currentTarget.getAttribute('data-key');
            setImageIdsMap(prevMap => {
                const newMap = new Map(prevMap);
                newMap.set(imageId, `image-${imageId}`);
                return newMap;
            });
        } 
        else {
            const imageId = e.currentTarget.getAttribute('data-key');
            const hasImageId = imageIdsMap.has(imageId);
            if (hasImageId) {
                imageIdsMap.delete(imageId);
            }
        }
    }

    const addImagesInAlbum = async () => {
        const albumId = prop.albumData._id;
        const imageIds = Array.from(imageIdsMap.keys());
        console.log("imageids type: ", typeof(imageIds));
        const result = await addingImageInAlbum(imageIds, albumId);

        if (result) {
            console.log("after adding aimges: ", albumDetail);
            toast.success("Images added to album successfully")
        }
        else {
            toast.error("Failed to add images")
        }
    }

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>
                Add Image
            </button>

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg mb-1">
                        Select Images to Add In Album
                    </h3>

                    <div className='py-4 flex gap-4'>
                        {images.length === 0 ? (
                            <span className='noImageSpan'>
                                No Images to add
                            </span>
                        ) : (
                            images.map(image => createImages(image))
                        )}
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn" onClick={addImagesInAlbum}>
                                {isAddingImageInAlbum ? (
                                    <Loader2 className='w-4 animate-spin'/>
                                ) : (
                                    "Add Images"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddImagesInAlbumModal;