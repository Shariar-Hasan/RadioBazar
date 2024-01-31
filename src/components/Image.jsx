
import defaultImage from "./../assets/radio.png"
const Image = ({ alt, ...rest }) => {
    return (
        <img
            alt={alt || "Radio Bazar Image"}
            loading="lazy"
            onError={(e) => e.target.src = defaultImage}
            {...rest}
        />
    )
}

export default Image