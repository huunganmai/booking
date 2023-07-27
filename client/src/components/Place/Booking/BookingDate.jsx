import {differenceInCalendarDays, format} from 'date-fns'
import PropTypes from 'prop-types'
import { CalendarIcon, NightIcon } from '../../Icons'

export default function BookingDate({booking, className}) {
    return (
        <div className={'flex gap-2 ' + className}>
            <div className='flex'>
                <NightIcon/>
                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} night:
            </div>
            <div className='flex gap-1'>
                <CalendarIcon />
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
            </div>
            &rarr;
            <div className='flex gap-1'>
                <CalendarIcon />
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>
    )
}

BookingDate.propTypes = {
    booking: PropTypes.object,
    className: PropTypes.string,
}