import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import {Loader2} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";

import { useAlbumStore } from '../stores/useAlbumStore';

const AlbumDisplayArea = () => {
    const {albums, isGettingAllAlbums, getAllAlbums, getAlbum} = useAlbumStore();
    const navigate = useNavigate({ from: '/album/$id' })

    useEffect(() => {
        const fetchAlbums = async () => {
            const result = await getAllAlbums();

            if (!result) {
                toast.error("Unable to get albums");
            }

        }
        
        fetchAlbums();
    }, [])

    console.log("all album data in album display area : ", albums)

    const album = (album) => {
        // album = albums[0]=>object -> albums.albums
        return <div className='h-60 w-52 border-2 p-2 mr-5 rounded-xl cursor-pointer' key={album._id} data-key={album._id} onClick={clickOnAlbum}>
                {/* contain the album cover */}
            <div className='flex justify-center items-center h-[90%] w-full border-0'>
                <span>
                    Album
                </span>
            </div>

            {/* contain album name and number of images */}
            <div className='h-[10%] w-full border-0 flex justify-between'>
                <span>
                    {album.name}
                </span>

                <span>
                    {album.images.length === 0 ? "0" : `${album.images.length}`}
                </span>
            </div>
        </div>
    }

    const clickOnAlbum = async (e) => {
        const albumId = e.currentTarget.getAttribute('data-key');
        // console.log("album id : ", albumId);
        console.log("i am clicking on album")
        const result = await getAlbum(albumId);

        if (result) {
            navigate({to:"/album/$id", params:{id:`${albumId}`}});
        }
    }
    
    console.log("Albums: ", albums);
    return (
        <div className=' flex '>
            {albums.length === 0 ? (
                <span>
                    No Album Available
                </span>
            ) : (
                isGettingAllAlbums === "true" ? (
                    <Loader2 className='w-5 animate-spin' />
                ) : (
                    albums.map((a) => {
                        return album(a);
                    })
                )
            )}
        </div>
    )
}

export default AlbumDisplayArea;