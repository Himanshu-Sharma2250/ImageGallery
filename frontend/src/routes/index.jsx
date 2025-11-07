import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        <Navbar />
        <Tabs />
    </div>
}
