const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const Place = require('../models/Place')

class PlaceController {
    // [POST] /user-places/new/upload-by-link
    async uploadPhotoByLink(req, res, next) {
        const { link } = req.body
        const newPath = path.resolve(__dirname, '../..') + '/uploads/'
        const newName = 'photo' + Date.now() + '.jpg'
        try {
            await imageDownloader.image({
                url: link,
                dest: newPath + newName,
            })
            res.json(newName)
        } catch (err) {
            res.status(500).json({ err: 'Internal server error' })
        }
    }

    // [POST] /user-places/new/upload-from-computer
    uploadPhotoFromComputer(req, res, next) {
        const uploadFiles = []
        for (let i = 0; i < req.files.length; i++) {
            const { path, originalname } = req.files[i]
            const newName = 'photo' + Date.now()
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            const newPath = newName + '.' + ext
            fs.renameSync(path, 'uploads/' + newPath)
            uploadFiles.push(newPath)
        }
        res.json(uploadFiles)
    }

    // [POST] /user-places/new
    submitForm(req, res, next) {
        const { token } = req.cookies
        const { title, address, addedPhotos: photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const placeDoc = await Place.create({
                owner: userData.id,
                title,
                address,
                photos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            })
            res.json(placeDoc)
        })
    }

    // [GET] /user-places
    getPlaces(req, res, next) {
        const { token } = req.cookies
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err
            const { id } = userData
            const placeData = await Place.find({ owner: id })
            res.json(placeData)
        })
    }

    // [GET] /user-places/:id
    async getOnePlace(req, res, next) {
        const { id } = req.params
        const placeData = await Place.findById(id)
        res.json(placeData)
    }

    // [PUT] /user-places/:id
    async updatePlace(req, res, next) {
        const { token } = req.cookies
        const { id, title, address, addedPhotos: photos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw new err()
            const placeDoc = await Place.findById(id)
            if (userData.id === placeDoc.owner.toString()) {
                placeDoc.set({
                    title,
                    address,
                    photos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                })
                await placeDoc.save()
                res.json('done')
            }
        })
    }
}

module.exports = new PlaceController()
