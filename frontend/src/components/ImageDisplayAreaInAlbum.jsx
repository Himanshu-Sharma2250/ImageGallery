import React, { useEffect } from 'react'
import { useAlbumStore } from '../stores/useAlbumStore';
import toast from 'react-hot-toast';
import useImageStore from '../stores/useImageStore';
import { Loader2 } from 'lucide-react';
import DisplayImage from './DisplayImage';

const ImageDisplayAreaInAlbum = () => {
    const {albumDetail, getAlbum} = useAlbumStore();
    const album_data = albumDetail?.album_data;
    const {getImage, imageDetail} = useImageStore();

    useEffect(() => {
        const fetchAlbumData = async () => {
            const result = await getAlbum(album_data?._id);

            if (!result) {
                toast.error("Unable to fetch album data");
            }
        }
        fetchAlbumData();
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
        return <div className='h-40 w-32 cursor-pointer' key={image._id} data-key={image._id} onClick={getImageDetail}>
            <figure className='h-40 w-32'>
                <img src={image.image_url} className='h-40 w-32 rounded-xl' />
            </figure>
        </div>
    }

    return (
        <div className='py-4 px-4 flex gap-4'>
            {album_data?.images.length === 0 ? (
                <span className='noImageSpan'>
                    No Images
                </span>
            ) : (
                album_data?.images.map(image => createImages(image))
            )}
            {/* modal that show the full image and its detail */}
            <DisplayImage image={imageDetail} inImageTab={false} />
        </div>
    )
}

export default ImageDisplayAreaInAlbum;