import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import useImageStore from '../stores/useImageStore';

const ImageDisplayArea = () => {
    const [monthYear, setMonthYear] = useState(""); // will contain the month and year of the image that is uploaded

    const {images, isGettingAllImages, getAllImages} = useImageStore();

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

    const createImages = (image) => {
        return <div>
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
                images.map(image => createImages(image))
            )}
        </div>
    )
}

export default ImageDisplayArea;