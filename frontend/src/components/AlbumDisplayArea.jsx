import React, { useEffect } from 'react'
import { useAlbumStore } from '../stores/useAlbumStore';
import toast from 'react-hot-toast';

const AlbumDisplayArea = () => {
    const {albums, isGettingAllAlbums, getAllAlbums} = useAlbumStore();

    useEffect(() => {
        const fetchAlbums = async () => {
            const result = await getAllAlbums();

            if (!result) {
                toast.error("Unable to get albums");
            }

        }
        
        fetchAlbums();
    }, [])
    
    console.log("Albums: ", albums);
    return (
        <div className='h-full w-full flex justify-center items-center'>
            {albums.length === 0 ? (
                <span>
                    No Album Available
                </span>
            ) : (
                // albums.map(album => {
                //     return <div className='h-10 w-7 border-2'>
                //         <p>this albm</p>
                //     </div>
                // })
                <span>
                    No Album Available
                </span>
            )}
        </div>
    )
}

export default AlbumDisplayArea;