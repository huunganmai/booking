import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types"

import Title from "../../Title";

function PhotosUploader ({addedPhotos, onChange}) {
    const [photoLink, setPhotoLink] = useState('');
    async function addPhotoByLink(e) {
        e.preventDefault()
        try {
            const {data:filename} = await axios.post('/places/new/upload-by-link', {link: photoLink})
            onChange(prev => {
                return [...prev, filename]
            })
        } catch {
            alert('The link of photo is invalid')
        }
        setPhotoLink('')
    }

    function uploadPhoto (e) {
        const files = e.target.files;
        console.log(e)
        const data = new FormData();
        const fileLength = files.length;
        for (let i = 0; i < fileLength; i++) {
            data.append('photos', files[i])
        }
        axios.post('/places/new/upload-from-computer', data, {
            headers: {'Content-Type':'multipart/form-data'}
        })
        .then(res => {
            const {data: filenames} = res
            onChange(prev => {
                return [...prev, ...filenames]; 
            })
        })
        .catch(() => {
            alert('Can\'t upload image from your computer')
    })
    }
    return (
        <>
            <Title 
                title={"Photos"}
                description={"Photos for your place"}
                medium={true}
            />
            <div className="flex gap-2">
                <input 
                type='text' 
                value={photoLink} 
                onChange={ e => setPhotoLink(e.target.value)} 
                placeholder="Add using a link ...jpg"
                />
                <button onClick={addPhotoByLink} className="bg-gray-300 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 items-center grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                { addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                    <div key={index} className="h-32 flex">
                        <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/" + link} />
                    </div>
                ))}
                <label className="flex cursor-pointer gap-1 justify-center items-center border bg-transparent rounded-2xl p-8 text-gray-600 h-full">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}

PhotosUploader.propTypes = {
    addedPhotos: PropTypes.array,
    onChange: PropTypes.func,
}

export default PhotosUploader