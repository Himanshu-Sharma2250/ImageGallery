import { createFileRoute } from '@tanstack/react-router'
import AlbumNavBar from '../components/AlbumNavBar'
import ImageDisplayAreaInAlbum from '../components/ImageDisplayAreaInAlbum'

export const Route = createFileRoute('/album/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>
        <AlbumNavBar />
        <ImageDisplayAreaInAlbum />
    </div>
}
