import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams} from "react-router-dom";

import Title from "../Title";
import Perks from "./Perks";  
import PhotosUploader from "./PhotosUploader";

function PlaceForm () {

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState('')

    const {id} = useParams();
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/places/' + id)
            .then(res => {
                const {data} = res
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
            })
            .catch(err => console.log(err))
    }, [id])

    async function savePlace (e) {
        e.preventDefault();
        const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests}
        if (id) {
            await axios.put('places/new', {
                id, ...placeData,
            });
            setRedirect('/account/places')
        } else {
            await axios.post('/places/new', placeData);
            setRedirect('/account/places')
        }
    }

    if (redirect) {
        return <Navigate to= {redirect}/>
    }

    return (
        <div>
                    <form onSubmit={savePlace}>
                        <Title 
                        title={"Title"}
                        description={"Title for your place"}
                        medium={true}
                        />
                        <input 
                            type='text' 
                            value={title} 
                            onChange={ e => setTitle(e.target.value)} 
                            placeholder="title, for example: My lovely place"
                        />
                        <Title 
                        title={"Address"}
                        description={"Address for your place"}
                        medium={true}
                        />
                        <input 
                        type="text" 
                        value={address} 
                        onChange={ e => setAddress(e.target.value)} 
                        placeholder="address"
                        />
                        <PhotosUploader 
                            addedPhotos={addedPhotos}
                            onChange={setAddedPhotos}
                        />
                        <Title 
                        title={"Description"}
                        description={"Description of your place"}
                        medium={true}
                        />
                        <textarea
                            value={description} 
                            onChange={ e => setDescription(e.target.value)}
                        />
                        <Perks selected={perks} onChange={setPerks}/>
                        <Title 
                        title={"Extra Info"}
                        description={"House rules, etc"}
                        medium={true}
                        />
                        <textarea 
                            cols="30" 
                            rows="10" 
                            value={extraInfo} 
                            onChange={ e => setExtraInfo(e.target.value)}
                        />
                        <Title 
                        title={"Check in/out times"}
                        description={"add check in and out time"}
                        medium={true}
                        />
                        <div className="mt-1 grid gap-4 sm:grid-cols-3">
                            <div>
                                <h3 className="-mb-2">Check in time</h3>
                                <input 
                                    type="text" 
                                    placeholder="14:00"
                                    value={checkIn} 
                                    onChange={ e => setCheckIn(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3 className="-mb-2">Check out time</h3>
                                <input 
                                    type="text" 
                                    placeholder="14:00"
                                    value={checkOut} 
                                    onChange={ e => setCheckOut(e.target.value)}
                                />
                            </div>
                            <div>
                                <h3 className="-mb-2">Max number of guest</h3>
                                <input 
                                    type="number" 
                                    placeholder="3"
                                    value={maxGuests} 
                                    onChange={ e => setMaxGuests(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="primary mt-4">Save</button>
                        </div>
                    </form>
                </div>
    )
}

export default PlaceForm