import { Link } from "react-router-dom"


import { AddIcon } from "../components/Icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/places')
            .then(({data}) => {
                setPlaces(data);
            })
            .catch(e => {
                console(e)
                alert('Can\'t get places')
            })
    }, [])


    
    return (          
        <div className="text-center mt-4">
            <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                <AddIcon/>
                Add new places
            </Link>
            <br/>
            <div>
                {places.length > 0 && places.map((place, index) => (
                    <Link to={'/account/places/' + place._id} key= {index} className="flex cursor-pointer bg-gray-200 p-4 m-2 rounded-2xl">
                        <div className="h-32 w-32 bg-gray-300 grow shrink-0">
                            {place.photos.length > 0 && (
                                <img src={"http://localhost:4000/uploads/" + place.photos[0]} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>                               
                    </Link>
                ))}
            </div>
        </div>
    )
}