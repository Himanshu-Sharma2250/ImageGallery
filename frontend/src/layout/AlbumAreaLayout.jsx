import { Outlet } from '@tanstack/react-router';
import AlbumNavBar from '../components/AlbumNavBar';

const AlbumAreaLayout = () => {
    return (
        <div>
            <AlbumNavBar/>
            <Outlet/>
        </div>
    )
}

export default AlbumAreaLayout;