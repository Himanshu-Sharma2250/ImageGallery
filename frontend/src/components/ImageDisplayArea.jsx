import React, { useState } from 'react'

const ImageDisplayArea = () => {
    const [monthYear, setMonthYear] = useState(""); // will contain the month and year of the image that is uploaded

    return (
        <div className='h-full w-full flex justify-center items-center'>
            <span className='noImageSpan'>
                No Images Available
            </span>

            {/* other div that contain the mon-year and images */}
            <div> 
                {/* contain the month-year */}
                <p></p>

                {/* contain the images */}
                <div></div>
            </div>
        </div>
    )
}

export default ImageDisplayArea;