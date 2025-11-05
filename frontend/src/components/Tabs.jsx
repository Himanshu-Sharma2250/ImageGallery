import React from 'react'
import ImageDisplayArea from './ImageDisplayArea';
import AlbumDisplayArea from './AlbumDisplayArea';

const Tabs = () => {
    return (
        <div className="tabs tabs-lift px-4">
            <input type="radio" name="my_tabs_3" className="tab" aria-label="All Images" defaultChecked />
            <div className="tab-content bg-base-100 border-base-300 p-6">
                <ImageDisplayArea />
            </div>

            <input type="radio" name="my_tabs_3" className="tab" aria-label="Albums" />
            <div className="tab-content bg-base-100 border-base-300 p-6 ">
                <AlbumDisplayArea />
            </div>
        </div>
    )
}

export default Tabs;