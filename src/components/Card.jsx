import Image from "./Image"

const Card = ({
    station,
    selectedRadioStation,
    setSelectedRadioStation
}) => {
    const { name, id, favicon, language, tags } = station || {}
    return (
        <div
            onClick={() => {
                setSelectedRadioStation(station)
                console.log({ station })
            }}
            className={`${selectedRadioStation?.id === id ? "border-primary bg-gray-950/50" : ""} stationName border rounded-lg flex items-center justify-between gap-5 px-3 py-1 cursor-pointer bg-gray-900 h-full hover:bg-zinc-950 duration-200 active:scale-[.99]`}>
            <Image
                className="logo w-[60px] aspect-square rounded-full"
                src={favicon}
                alt="station logo"
            />
            <div className="flex-1 text-sm tracking-wide">
                <h6 className="text-base font-semibold">{name}</h6>
                {
                    language.filter(lang => lang !== '').length > 0 && <p className="text-xs mt-1">Language : {
                        language.map((lang) =>
                            <span
                                key={lang}
                                className="px-1 bg-blue-900 rounded mr-1"
                            >
                                {lang}
                            </span>
                        )
                    }</p>
                }
                {
                    tags.length > 0 && <p className="text-xs mt-1">Tags : {
                        tags.map((lang) =>
                            <span
                                key={lang}
                                className="px-1 bg-teal-700 text-gr ay-900 rounded mr-1"
                            >

                                {lang}
                            </span>
                        )
                    }</p>
                }

            </div>
        </div>
    )
}

export default Card