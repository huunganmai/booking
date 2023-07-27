import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlaceImage } from "../../components/Place"
import { BookingDate } from "../../components/Place/Booking"
import { CreditCardIcon } from "../../components/Icons"

export default function BookingsPage() {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div className="">
            {bookings.length > 0 && bookings.map((booking, index) => (
                <Link key={index} to={'/account/bookings/'+ booking._id}className="inline-flex pr-4 flex gap-2 mt-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-52">
                        <PlaceImage place={booking.place}/>
                    </div>
                    <div className="py-3">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        <BookingDate booking={booking} className='mb-2 mt-2 text-gray-500'/>
                        <div className="flex gap-1 items-center font-semibold">
                            <CreditCardIcon />
                            <span className="text-2xl">
                                Total price: ${booking.price}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}