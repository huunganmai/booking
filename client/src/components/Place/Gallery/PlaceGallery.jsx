import { useState } from "react"
import PropTypes from "prop-types"

import { CloseIcon, PhotosIcon } from "../../Icons"

export default function PlaceGallery({place}) {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if(showAllPhotos) {
        return (
            <div className="absolute bg-white min-w-full min-h-screen">
                <div className="grid gap-2 bg-black p-8">
                    <div>
                        <h2 className="text-3xl text-white">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="flex fixed right-8 top-8 rounded-2xl px-2 py-1 bg-white text-black" >
                            <CloseIcon />
                            Close photos
                        </button>
                    </div>
                    {place?.photos.length > 0 && place.photos.map((photo, index) => (
                        <div key={index}>
                            <img src={"http://localhost:4000/uploads/" + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative" >
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2 " src={"http://localhost:4000/uploads/" + place.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-gray-500 rounded-2xl border border-black">
                    <PhotosIcon />
                    See more photos
                </button>
            </div>
    )
}

PlaceGallery.propTypes = {
    place: PropTypes.object,
}