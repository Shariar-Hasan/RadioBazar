import { useEffect, useState } from "react"

const SearchText = ({
    searchedText = "",
    setSearchedText,
    countryList = [],
    onSelect = () => { }
}) => {
    const [isSearching, setIsSearching] = useState(false)
    const [showCountryList, setShowCountryList] = useState([])
    useEffect(() => {
        const newShowCountries = countryList?.filter((country) =>
            country.name.toLowerCase().includes(searchedText.toLowerCase())
        )
        setShowCountryList(newShowCountries)
    }, [searchedText]);
    return (
        <>
            <input
                placeholder="search by country"
                type="text"
                value={searchedText}
                className="px-4 py-2 w-full bg-gray-800 rounded-full"
                onFocus={() => setIsSearching(true)}
                onBlur={() => setTimeout(() => {
                    setIsSearching(false)
                }, 500)}
                onChange={e => setSearchedText(e.target.value)}
            />

            {(showCountryList.length > 0 && isSearching)
                &&
                <div className="w-full max-h-[300px] overflow-y-auto absolute z-[10] top-[100%] left-1/2 translate-x-[-50%] p-2 bg-gray-950 text-white" >
                    {
                        showCountryList?.map((country, index) =>
                            <div
                                key={index}
                                onClick={() => {
                                    onSelect(country)
                                    setTimeout(() => {
                                        setShowCountryList([])
                                    }, 10)
                                }}
                                className="w-full p-2 hover:bg-gray-800 rounded-md text-white cursor-pointer">
                                {country.name}
                            </div>)
                    }
                </div>}
        </>
    )
}

export default SearchText