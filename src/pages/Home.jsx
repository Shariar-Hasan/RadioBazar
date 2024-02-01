
import { useEffect, useState } from "react";
import SearchText from "../components/SearchText";
import Card from "../components/Card";
import api from "../assets/RadioApiProvider";
import { IoSettings } from "react-icons/io5";
import AudioPlayer from "../components/AudioPlayer";

const Home = () => {
    const [stations, setStations] = useState();

    // new states
    const [selectedRadioStation, setSelectedRadioStation] = useState(null)
    const [countryList, setCountryList] = useState([])
    const [searchedText, setSearchedText] = useState("")

    useEffect(() => {
        getStationsByCountries("bd")
        getCountryList()
    }, []);
    // getting country list
    const getCountryList = async () => {
        fetch("https://de1.api.radio-browser.info/json/countries")
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                // console.log(data);
                setCountryList(data)
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const getStationsByCountries = async (countryCode) => {
        // query stations by country code and limit to first 100 stations
        try {
            const newStations = await api.searchStations({
                // language: "english",
                countryCode: countryCode,
                limit: 100,
                offset: 0 // this is the default - can be omited
            })
            setStations(newStations)
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="container mx-auto">
            <AudioPlayer station={selectedRadioStation} />
            <div className="mb-3 mt-5 pt-2 text-center text-6xl font-bold site-special-text">
                <span className="bangla-font">রেডিও বাজার</span>
                <span>/</span>
                <span className="stylish-font">Radio Bazar</span>
            </div>
            <div className="">
                <div className="relative max-w-[400px] mx-auto flex justify-center py-4 mb-5 z-10 items-center">
                    <SearchText
                        searchedText={searchedText}
                        setSearchedText={setSearchedText}
                        countryList={countryList}
                        onSelect={(country) => {
                            getStationsByCountries(country.iso_3166_1)
                            setSearchedText(country.name)
                        }}
                    />
                    <div>
                        <IoSettings />
                    </div>
                </div>
            </div>
            <div className="text-center">
                <span>{stations?.length} Available Channel</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {stations &&
                    stations?.map((station) => {
                        return (
                            <div className="col-span-1" key={station?.id}>
                                <Card
                                    station={station}
                                    setSelectedRadioStation={setSelectedRadioStation}
                                    selectedRadioStation={selectedRadioStation}
                                />
                            </div>
                        );
                    })}
            </div>
            {/* <div className="bg-blue-500 fixed bottom-0 mt-2 w-full">
                <div className="mx-auto w-[400px]">
                    <audio
                        autoPlay
                        className="player w-full"
                        src={selectedRadioStation.urlResolved}
                    />
                </div>
            </div> */}
        </div >
    )
}

export default Home