import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios"
import { Navigate } from "react-router-dom"

import { UserContext } from "../../../UserContext"

export default function BookingWidget({place}) {

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuest, setNumberOfGuest] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNight = 0
    numberOfNight = differenceInCalendarDays(new Date(checkOut), new Date (checkIn))
    async function bookThisPlace() {
        const placeData = {
            checkIn, checkOut, numberOfGuest, name, mobile,
            place:place._id,
            price: numberOfNight * place.price
        }
        const {data} = await axios.post('/bookings', placeData)
        setRedirect(`/account/bookings`)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow  p-4 rounded-2xl">
            <div className="text-center font-bold text-2xl">
                Price: {place.price} / night
            </div>
            <div className="border rounded-2xl my-4">
                <div className="flex">
                    <div className="p-4  border-r ">
                        <label htmlFor="checkin" >Check-in:</label>
                        <input 
                            id="checkin" 
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="p-4 rounded-2xl">
                        <label htmlFor="checkout" >Check-out:</label>
                        <input 
                            id="checkout" 
                            type="date" 
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className="px-4 py-3 border-t">
                    <label>Number of guest:</label>
                    <input 
                        type="number" 
                        id="guest"
                        value={numberOfGuest}
                        onChange={(e) => setNumberOfGuest(e.target.value)}
                    />
                </div>
                {numberOfNight > 0 && (
                    <div className="px-4 py-3 border-t">
                        <label>Your full name:</label>
                        <input 
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label>Phone number</label>
                        <input 
                            type="tel"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button onClick={() => bookThisPlace()} className="primary">
                Book this place
                {numberOfNight > 0 && (
                    <span>${numberOfNight * place.price}</span>
                )}
            </button>
        </div>
    )
}

BookingWidget.propTypes = {
    place: PropTypes.object,
}
