const express = require("express")
const router = express.Router()

const BookingController = require("../app/controllers/BookingController")
const getUserDataFromToken = require("../app/middlewares/getUserDataFromToken")

router.post("/", getUserDataFromToken, BookingController.bookings)
router.get("/", getUserDataFromToken, BookingController.getBookings)

module.exports = router
