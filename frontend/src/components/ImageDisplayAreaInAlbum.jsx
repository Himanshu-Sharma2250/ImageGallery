import React, { useEffect } from 'react'
import { useAlbumStore } from '../stores/useAlbumStore';
import toast from 'react-hot-toast';
import useImageStore from '../stores/useImageStore';

const ImageDisplayAreaInAlbum = () => {
    const {albumDetail, getAlbum} = useAlbumStore();
    const album_data = albumDetail?.album_data;
    const {getImage, isGettingImage, imageDetail} = useImageStore();

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

        document.getElementById("show_image_modal").showModal();
    }

    const createImages = (image) => {
        return <div className='h-40 w-32 cursor-pointer' key={image.name} data-key={image._id} onClick={getImageDetail}>
            <figure className='h-40 w-32'>
                <img src={image.image_url} className='h-40 w-32 rounded-xl' />
            </figure>
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

    console.log("album data in useEffect : ", album_data);

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
            <dialog id="show_image_modal" className="modal">
                <div className="modal-box w-11/12 max-w-5xl flex gap-1.5 p-2.5">
                    <div className=''>
                        <img src={imageDetail?.imageData.url} alt={imageDetail?.imageData.name} className={`h-[${imageDetail?.imageData.height}px] w-[${imageDetail?.imageData.width}px]`} />
                    </div>

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
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )
}

export default ImageDisplayAreaInAlbum;