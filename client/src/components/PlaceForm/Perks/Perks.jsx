import PropTypes from "prop-types"

import { EntranceIcon, ParkingIcon, PetIcon, TiviIcon, WifiIcon } from "../../Icons";
import Title from '../../Title';

function Perks ({selected, onChange}) {

    function handleCbClick(ev) {
        const {checked, name} = ev.target
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange([...selected.filter(selectedName => selectedName !== name)])}
    }

    return (
        <>
            <Title 
                title="Perks"
                description="Select all the perks"
                medium={true}
            />
            <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <label className="border flex gap-2 p-4 rounded-2xl items-center">
                    <input type='checkbox' name="wifi" onChange={handleCbClick} />
                    <WifiIcon/>
                    <span>Wifi</span>
                </label>
                <label className="border flex gap-2 p-4 rounded-2xl items-center">
                    <input type='checkbox' name="parking" onChange={handleCbClick} />
                    <ParkingIcon/>
                    <span>Free parking spot</span>
                </label>
                <label className="border flex gap-2 p-4 rounded-2xl items-center">
                    <input type='checkbox' name="tv" onChange={handleCbClick} />
                    <TiviIcon/>
                    <span>TV</span>
                </label>
                <label className="border flex gap-2 p-4 rounded-2xl items-center">
                    <input type='checkbox' name="pets" onChange={handleCbClick} />
                    <PetIcon/>
                    <span>Pets</span>
                </label>
                <label className="border flex gap-2 p-4 rounded-2xl items-center">
                    <input type='checkbox' name="entrance" onChange={handleCbClick} />
                    <EntranceIcon/>
                    <span>Entrance</span>
                </label>
            </div>
        </>
    )
}

Perks.propTypes = {
    selected: PropTypes.array,
    onChange: PropTypes.func,
}

export default Perks