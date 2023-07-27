import PropTypes from 'prop-types'

import Image from './Image'

export default function PlaceImage({place, className=null}) {
    if(!place.photos?.length) {
        return ('')
    }
    if(!className) {
        className = 'object-cover'
    }
    return (        
        <Image className={className} src={place.photos[0]}/>        
    )
}

PlaceImage.propTypes = {
    place: PropTypes.object,
    index: PropTypes.number,
    className: PropTypes.string,
}