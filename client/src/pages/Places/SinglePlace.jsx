import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {CloseIcon, PhotosIcon} from "../../components/Icons"

function SinglePlace () {
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if(!id) {
            return
        } 
        axios.get(`places/${id}`)
            .then(({data}) => {
                setPlace(data)
            })
            .catch ((err) => {
                console.log(err)
            })
    }, [id])

    if(!place) return ''

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
        <div className="mt-4 pt-4 bg-gray-100">
            <h1>{place?.title}</h1>
            <a className="block font-semibold underline" target="\_blank" href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
            <div className="relative" >
                <div className="grid gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {place.photos?.[1] && (
                                <img className="aspect-square object-cover" src={"http://localhost:4000/uploads/" + place.photos[1]} alt="" />
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2 " src={"http://localhost:4000/uploads/" + place.photos[2]} alt="" />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-gray-500 rounded-2xl border border-black">
                    <PhotosIcon />
                    See more photos
                </button>
            </div>
        </div>
    )
}

export default SinglePlace