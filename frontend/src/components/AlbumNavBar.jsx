import {ArrowLeft, Loader2} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAlbumStore } from "../stores/useAlbumStore";
import AddImagesInAlbumModal from "./AddImagesInAlbumModal";

const AlbumNavBar = () => {
    const {albumDetail, deleteAlbum, isDeletingAlbum} = useAlbumStore();
    const album_data = albumDetail?.album_data

    const navigate = useNavigate({ from: '/album/$id' });

    console.log("album detail in other pafe: ", album_data);

    const delete_album = async () => {
        const albumId = album_data?._id;
        const result = await deleteAlbum(albumId);

        if (result) {
            navigate({to:"/"});
        }
    }

    return (
        <div className="border-0 flex justify-between  py-2">
            <div className="flex">
                <div className="">
                    <button className="btn btn-ghost">
                        <Link to={'/'} className="w-full h-full flex justify-center items-center">
                            <ArrowLeft className="w-4"/>
                        </Link>
                    </button>
                </div>

                <div className="">
                    <a className="btn btn-ghost text-xl">
                        {album_data?.name}
                    </a>
                </div>
            </div>

            <div className="flex gap-2 mr-5">
                <AddImagesInAlbumModal albumData={album_data}/>
                
                <button className="btn btn-error" onClick={delete_album}>
                    {isDeletingAlbum ? (
                        <Loader2 className="w-4 animate-spin" />
                    ) : (
                        "Delete"
                    )}
                </button>
            </div>
        </div>
    )
}

export default AlbumNavBar;