import {ArrowLeft} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAlbumStore } from "../stores/useAlbumStore";

const AlbumNavBar = () => {
    const {albumDetail} = useAlbumStore();
    const album_data = albumDetail.album_data

    console.log("album detail in other pafe: ", album_data);

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
                        {album_data.name}
                    </a>
                </div>
            </div>

            <div className="flex gap-2 mr-5">
                <button className="btn btn-ghost"> 
                    Add Image
                </button>
                
                <button className="btn btn-error">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default AlbumNavBar;