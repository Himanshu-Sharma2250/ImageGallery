import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {Loader2} from "lucide-react";

import useImageStore from '../stores/useImageStore';
import DisplayImage from './DisplayImage';

const ImageDisplayArea = () => {
    const [monthYear, setMonthYear] = useState(""); // will contain the month and year of the image that is uploaded

    const {images, isGettingAllImages, getAllImages, getImage, imageDetail} = useImageStore();

    useEffect(() => {
        const fetchImages = async () => {
            const result = await getAllImages();

            if (!result) {
                toast.error("Unable to load images");
            }
        }
        fetchImages();
    }, [])

    const getImageDetail = async (e) => {
        const imageId = e.currentTarget.getAttribute("data-key");
        const result = await getImage(imageId);

        if (!result) {
            toast.error("Unable to fetch image");
        }

        document.getElementById("display_image_modal").showModal();
    }

    const createImages = (image) => {
        return <div className='mr-4 cursor-pointer' key={image._id} data-key={image._id} onClick={getImageDetail}>
            <img src={image.image_url} className='h-40 w-32 rounded-xl' />
        </div>
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
            <DisplayImage image={imageDetail} inImageTab={true} />
        </div>
    )
}

export default ImageDisplayArea;