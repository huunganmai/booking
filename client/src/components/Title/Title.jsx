import PropTypes from 'prop-types';

function Title ({
    title,
    description,
    small = false,
    medium = false,
    large = false,

}) {
    let titleClassName
    if(small) {
        titleClassName = "text-1xl mt-4"
    } else if (medium) {
        titleClassName = "text-2xl mt-4"
    } else if (large){
        titleClassName = "text-4xl mt-4"
    }

    return (
        <>
            {title && <h2 className={titleClassName}>{title}</h2>}
            {description && <p className='text-gray-500'>{description}</p>}
        </>
    )
}

Title.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
}

export default Title