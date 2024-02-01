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
                if (selectedRadioStation?.id === station.id) {
                    setSelectedRadioStation(null)
                } else {
                    setSelectedRadioStation(station)
                }

                console.log({ station })
            }}
            className={`${selectedRadioStation?.id === id ? "border-blue-800 bg-gray-950/50" : "border-transparent"} stationName border-2 rounded-lg flex items-center justify-between gap-5 px-3 py-1 cursor-pointer bg-gray-900 h-full hover:bg-zinc-950 duration-200 active:scale-[.99]`}>
            <Image
                className="logo w-[60px] aspect-square rounded-full"
                src={favicon}
                alt="station logo"
            />
            <div className="flex-1 text-sm tracking-wide">
                <h6 className="text-base font-semibold">{name}</h6>
                {
                    language.filter(lang => lang !== '').length > 0 && <div className="text-xs mt-1 flex flex-wrap gap-1">Language : {
                        language.map((lang) =>
                            <span
                                key={lang}
                                className="px-1 bg-blue-900 rounded mr-1"
                            >
                                {lang}
                            </span>
                        )
                    }</div>
                }
                {
                    tags.length > 0 && <div className="text-xs mt-1 flex flex-wrap gap-1">Tags : {
                        tags.map((lang) =>
                            <span
                                key={lang}
                                className="px-1 bg-teal-700 text-gr ay-900 rounded "
                            >

                                {lang}
                            </span>
                        )
                    }</div>
                }

            </div>
        </div>
    )
}

export default Card