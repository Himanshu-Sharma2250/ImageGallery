import { CalendarClock, CalendarRange, Image, Info, Loader2, Proportions, Trash2 } from 'lucide-react';
import useImageStore from '../stores/useImageStore';
import { useAlbumStore } from '../stores/useAlbumStore';

const DisplayImage = (prop) => {
    const image = prop.image?.imageData;
 
    const {deleteImage, isDeletingImage} = useImageStore();
    const {removeImageFromAlbum, isRemovingImage} = useAlbumStore();

    const delete_remove_Image = async () => {
        let deleteResult = false;
        let removeResult = false;
        if (prop.inImageTab) {
            deleteResult = await deleteImage(image.imageId);
        }
        else {
            removeResult = await removeImageFromAlbum(image?.album_id, image?.imageId);
        }

        if (deleteResult | removeResult) {
            document.getElementById("display_image_modal").close();
        }
    }

    const showName = (name) => {
        return name?.slice(0, -4);
    }

    const showDate = (date) => {
        const new_date = date?.slice(0, -14);
        const wholeDate = new Date(new_date);
        const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const uploadDate = wholeDate.getDate();
        const uploadMonthInNumber = wholeDate.getMonth();
        const uploadMonthInWord = months[uploadMonthInNumber];
        const uploadYear = wholeDate.getFullYear();

        return [uploadDate, uploadMonthInWord, uploadYear];
    }

    const showTime = (time) => {
        const utcDate = new Date(time);
        const new_time = utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        const hour = new_time?.slice(12,13);
        const min = new_time?.slice(14,16);
        const sec = new_time?.slice(17,19);

        return [hour, min, sec];
    }

    return (
        <div>
            {/* <button className='btn' onClick={() => document.getElementById("display_image_modal").showModal()}>open</button> */}
            <dialog className='h-svh w-svw absolute top-5 left-5 rounded-xs' id='display_image_modal'>
                {/* to show the image name and button to delete image and close modal */}
                <div className='flex justify-between items-center px-2 py-1 h-[10%] w-full border-2'>
                    <button className='btn btn-error' onClick={delete_remove_Image}>
                        {isDeletingImage | isRemovingImage ? (
                            <Loader2 className='w-4 animate-spin' />
                        ) : (
                            <Trash2 className='w-4' />
                        )}
                    </button>

                    <span>
                        {image?.name}
                    </span>

                    <button className='btn hover:bg-red-500' onClick={() => document.getElementById("display_image_modal").close()}>
                        X
                    </button>
                </div>

                {/* to show image */}
                <div className='h-[80%] w-full border-r-2 border-l-2 flex items-center justify-center relative'>
                    <div className='h-full'>
                        <img src={image?.url} className='h-full' />
                    </div>

                    <dialog className='h-[400px] w-[400px] absolute top-35 left-275' id='show_image_info_modal'>
                        <div className='flex flex-col gap-6'>
                            {/* info and button to close it */}
                            <div className='flex justify-between items-center py-2 px-3'>
                                <h2 className='font-bold text-2xl'>
                                    Info
                                </h2>

                                <button className='text-gray-400 hover:text-gray-200 cursor-pointer' onClick={() => document.getElementById("show_image_info_modal").close()}>
                                    X
                                </button>
                            </div>

                            {/* show info */}
                            <div className='flex flex-col gap-2.5'>
                                {/* show image name */}
                                <div className='flex items-center gap-4 px-2'>
                                    <Image className='w-5' />

                                    <span>
                                        {showName(image?.name)}
                                    </span>
                                </div>
                                {/* show upload date */}
                                <div className='flex gap-4 items-center px-2'>
                                    <CalendarRange className='w-5' />

                                    <div>
                                        <span className='btn cursor-default'>
                                            {showDate(image?.createdAt)[0]}
                                        </span>
                                        <span className='btn cursor-default'>
                                            {showDate(image?.createdAt)[1]}
                                        </span>
                                        <span className='btn cursor-default'>
                                            {showDate(image?.createdAt)[2]}
                                        </span>
                                    </div>
                                </div>
                                {/* show upload time */}
                                <div className='flex gap-4 items-center px-2'>
                                    <CalendarClock className='w-5' />

                                    <div className='flex gap-1 items-center'>
                                        <span className='btn cursor-default'>
                                            {showTime(image?.createdAt)[0]}
                                        </span>
                                        <span>
                                            :
                                        </span>
                                        <span className='btn cursor-default'>
                                            {showTime(image?.createdAt)[1]}
                                        </span>
                                        <span>
                                            :
                                        </span>
                                        <span className='btn cursor-default'>
                                            {showTime(image?.createdAt)[2]}
                                        </span>
                                    </div>
                                </div>
                                {/* image dimension */}
                                <div className='flex gap-4 items-center px-2'>
                                    <Proportions className='w-5' />

                                    <span>
                                        {image?.height} x {image?.width}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </dialog>
                </div>

                {/* footer to show info button and dimension */}
                <div className='flex justify-between items-center px-3 py-1 h-[10%] w-full border-2'>
                    <button className='btn' onClick={() => document.getElementById("show_image_info_modal").showModal()}>
                        <Info className='w-4' />
                    </button>

                    <span className='flex items-center gap-2'>
                        <Proportions className='w-4' />

                        <span>
                            {image?.height} x {image?.width}
                        </span>
                    </span>
                </div>
            </dialog>
        </div>
    )
}

export default DisplayImage;