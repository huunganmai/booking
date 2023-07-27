import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { MapIcon, } from "../../components/Icons"
import {BookingWidget} from "../../components/Place"
import PlaceGallery from "../../components/Place/Gallery"
import PlaceAddressLink from "../../components/Place/Address"

function SinglePlace () {
    const {id} = useParams()
    const [place, setPlace] = useState(null)

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

    

    return (
        <div className="mx-16 mt-4 pt-4 bg-gray-100">
            <h1>{place?.title}</h1>
            <PlaceAddressLink place={place} />
            <PlaceGallery place={place}/>
            <div className="grid grid-cols-2 mt-4">
                <div>
                    <div className="">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}<br/>
                    Check-out: {place.checkOut}<br/>
                    Max number of guest: {place.maxGuests}
                </div>
                <BookingWidget place={place} />
            </div>
            <div className="bg-white -mx-8 mt-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">Extra Info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
            </div>
        </div>
    )
}

export default SinglePlace