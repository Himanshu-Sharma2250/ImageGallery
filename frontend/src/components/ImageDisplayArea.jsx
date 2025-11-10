import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Loader2} from "lucide-react";

import useImageStore from '../stores/useImageStore';
import { useAlbumStore } from '../stores/useAlbumStore';

const ImageDisplayArea = () => {
    const [monthYear, setMonthYear] = useState(""); // will contain the month and year of the image that is uploaded

    const {images, isGettingAllImages, getAllImages, getImage, isGettingImage, imageDetail, deleteImage, isDeletingImage} = useImageStore();
    const {removeImageFromAlbum} = useAlbumStore();

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getAllImages();

            if (!result) {
                toast.error("Unable to load images");
            }
        }
        fetchImages();
    }, [])

    console.log("Images data in component: ", images);

    const imageWithMonthYearDiv = () => {
        return <div className='flex flex-col gap-2'>
            {/* shows month and year */}
            <div>
                <span>
                    {monthYear}
                </span>
            </div>

            {/* shows all images */}
            <div>

            </div>
        </div>
    }

    const getImageDetail = async (e) => {
        const imageId = e.currentTarget.getAttribute("data-key");
        const result = await getImage(imageId);

        if (!result) {
            toast.error("Unable to fetch image");
        }

        document.getElementById("show_image_modal").showModal();
    }

    console.log("One image detail in image display component: ", imageDetail);

    const createImages = (image) => {
        return <div className='mr-4 cursor-pointer' key={image._id} data-key={image._id} onClick={getImageDetail}>
            <img src={image.image_url} className='h-40 w-32 rounded-xl' />
        </div>
    }

    const showDate = (date) => {
        return date?.slice(0, -14);
    }

    const showTime = (time) => {
        return time?.slice(11, -5);
    }

    const showName = (name) => {
        return name?.slice(0, -4);
    }

    const delete_image = async () => {
        console.log("Image id to pass in delete image : ", imageDetail?.imageData.imageId);
        const res = await removeImageFromAlbum(imageDetail?.imageData.album_id, imageDetail?.imageData.imageId);
        const result = await deleteImage(imageDetail?.imageData.imageId);

        if (result && res) {
            document.getElementById("show_image_modal").close();
        }
        else {
            toast.error("Error deleting image");
        }
    }

    return (
        <div className='h-full w-full flex '>
            {images.length === 0 ? (
                <span className='noImageSpan'>
                    No Images Available
                </span>
            ) : (
                isGettingAllImages ? (
                    <Loader2 className="w-4 animate-spin" />
                ) : (
                    images.map(image => createImages(image))
                )
            )}
            {/* modal that show the full image and its detail */}
            <dialog id="show_image_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex gap-1.5 p-2.5">
                    <div className=''>
                        <img src={imageDetail?.imageData.url} alt={imageDetail?.imageData.name} className={`h-full`} />
                    </div>

                    <div className='flex flex-col justify-between'>
                        {/* show image detail */}
                        <div className='flex flex-col gap-0.5'>
                            <h2>
                                Name: {showName(imageDetail?.imageData.name)}
                            </h2>
                            <span>
                                Upload Time: {showTime(imageDetail?.imageData.createdAt)}
                            </span>
                            <span>
                                Upload Date: {showDate(imageDetail?.imageData.createdAt)}
                            </span>
                        </div>
                        {/* delete image */}
                        <div className='flex items-center justify-end'>
                            <button className='btn btn-error' onClick={delete_image}>
                                {isDeletingImage ? (
                                    <Loader2 className='w-4 animate-spin' />
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default ImageDisplayArea;