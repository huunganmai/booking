import PropTypes from "prop-types"

import { MapIcon } from "../../Icons";

export default function PlaceAddressLink({place, className=null}) {
    if(!className) {
        className = 'my-3 block'
    }
    className += ' flex gap-1 font-semibold underline'
    return (
        <a className={className} target="\_blank" href={'https://maps.google.com/?q=' + place.address}>
            <MapIcon />
            {place.address}
        </a>
    )
}

PlaceAddressLink.propTypes = {
    place: PropTypes.object.isRequired,
    className: PropTypes.string,
}