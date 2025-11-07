import { Outlet } from '@tanstack/react-router';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout;