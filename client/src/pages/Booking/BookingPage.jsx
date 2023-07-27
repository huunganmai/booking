import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlaceGallery from "../../components/Place/Gallery";
import PlaceAddressLink from "../../components/Place/Address";
import { BookingDate } from "../../components/Place/Booking";

export default function BookingPage() {
    const {id} = useParams()
    const[booking, setBooking] = useState(null)

    useEffect(() => {
        if(id) {
            axios.get('/bookings').then(res => {
                const foundBooking = res.data.find(({_id}) => _id === id)
                if(foundBooking) {
                    setBooking(foundBooking)
                }
            })//.catch(() => {alert("cant find")})
        }
    },[id])
    console.log(booking)
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>           
            <PlaceAddressLink className='inline-flex' place={booking.place} />            
            <div className="flex items-center justify-between bg-gray-200 p-4 mb-4 rounded-2xl">
                <div>
                    <h2>Your booking information:</h2>
                    <BookingDate booking={booking} className='mb-2 mt-2 text-gray-500'/>
                </div>
                <div className="bg-primary p-4 rounded-2xl text-white">
                    <div>Total price</div>
                    <div className="text-3xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}