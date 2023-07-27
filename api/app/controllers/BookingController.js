const jwt = require("jsonwebtoken")

const Booking = require("../models/Booking")

class BookingController {
    // [post] /bookings
    async bookings(req, res) {
        try {
            const { place, checkIn, checkOut, numberOfGuest, name, mobile, price } = req.body
            const { id } = req.userData
            const bookingDoc = await Booking.create({
                place,
                checkIn,
                checkOut,
                numberOfGuest,
                name,
                mobile,
                price,
                user: id,
            })
            res.json(bookingDoc)
        } catch (err) {
            console.error("Lỗi:", err)
            res.status(500).json({ message: "Đã xảy ra lỗi" })
        }
    }

    async getBookings(req, res) {
        try {
            const { id } = req.userData
            res.json(await Booking.find({ user: id }).populate("place"))
        } catch (err) {
            console.error("Lỗi:", err)
            res.status(500).json({ message: "Đã xảy ra lỗi" })
        }
    }
}

module.exports = new BookingController()
