import React from 'react'
import { useAlbumStore } from '../stores/useAlbumStore';

const ImageDisplayAreaInAlbum = () => {
    const {albumDetail} = useAlbumStore();
    const album_data = albumDetail.album_data;

    return (
        <div className='flex w-full h-full justify-center items-center'>
            {album_data.images.length === 0? (
                <span>
                    No image available
                </span>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default ImageDisplayAreaInAlbum;