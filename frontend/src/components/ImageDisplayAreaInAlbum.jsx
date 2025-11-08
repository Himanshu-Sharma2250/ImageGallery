import React, { useEffect } from 'react'
import { useAlbumStore } from '../stores/useAlbumStore';
import toast from 'react-hot-toast';

const ImageDisplayAreaInAlbum = () => {
    const {albumDetail, getAlbum} = useAlbumStore();
    const album_data = albumDetail.album_data;

    useEffect(() => {
        const fetchAlbumData = async () => {
            const result = await getAlbum(album_data._id);

            if (!result) {
                toast.error("Unable to fetch album data");
            }
        }
        fetchAlbumData();
    }, [])

    const createImages = (image) => {
        return <div className='h-40 w-32' key={image.name} data-key={image._id}>
            <figure className='h-40 w-32'>
                <img src={image.image_url} className='h-40 w-32 rounded-xl' />
            </figure>
        </div>
    }

    console.log("album data in useEffect : ", album_data);

    return (
        <div className='py-4 px-4 flex gap-4'>
            {album_data.images.length === 0 ? (
                <span className='noImageSpan'>
                    No Images
                </span>
            ) : (
                album_data.images.map(image => createImages(image))
            )}
        </div>
    )
}

export default ImageDisplayAreaInAlbum;