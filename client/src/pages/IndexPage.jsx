import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function IndexPage() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places')
            .then(res => {
                setPlaces([...res.data, ...res.data])
            })
    }, [])
    return (
        <div className="mt-8 grid gap-x-6 gap-y-8  grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map((place, index) => (
                <Link key={index} to={"/places/" + place._id} >
                    <div>
                        {place.photos.length > 0 && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt='' />
                        )}
                    </div>
                    <h2 className="font-bold leading-4">{place.address}</h2>
                    <h3 className="text-sm truncate leading-4 text-gray-500">{place.title}</h3>
                    <div className="mt-2">
                        <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}