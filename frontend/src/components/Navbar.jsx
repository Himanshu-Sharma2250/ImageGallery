import React from 'react'
import CreateAlbumModal from './CreateAlbumModal';
import UploadImageModal from './UploadImageModal';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

const Navbar = () => {
    const {isLoggingOut, logout} = useAuthStore();
    const navigate = useNavigate();

    const logOut = async () => {
        const result = await logout();

        if (result) {
            navigate({to:"/signin"});
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between">
            <div className="flex">
                <a className="btn btn-ghost text-xl">Image Gallery</a>
            </div>

            <div className="flex gap-1">
                
                <CreateAlbumModal />
            
                <UploadImageModal />

                <button className='btn btn-error rounded-xl btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl' onClick={logOut}>
                    {isLoggingOut ? (
                        <Loader2 className='w-4' />
                    ) : (
                        "Logout"
                    )}
                </button>
                
            </div>
        </div>
    )
}

export default Navbar;