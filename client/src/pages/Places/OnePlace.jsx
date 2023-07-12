import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function OnePlace () {
    const {id} = useParams()
    const [placeData, setPlaceData] = useState(null)
    useEffect(() => {
        if(!id) {
            return
        } 
        axios.get('/places/' + id)
        .then(({data}) => {
            setPlaceData(data)
        })
        .catch ((err) => {
            console.log(err)
        })
    }, [id])
    return (
        <div>
            <h2>place</h2>
        </div>
    )
}

export default OnePlace