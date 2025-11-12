import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
import { useAuthStore } from '../stores/useAuthStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    const {checkAuth} = useAuthStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUser = async () => {
            const result = await checkAuth();

            if (result) {
                navigate({to:"/"})
            } else {
                navigate({to:"/signup"})
            }
        }
    
        fetchUser();
    }, [])

    return <div>
        <Navbar />
        <Tabs />
    </div>
}
