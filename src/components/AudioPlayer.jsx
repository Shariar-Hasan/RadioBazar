import { useEffect, useRef, useState } from "react"
import Image from "./Image"
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { ImLoop } from "react-icons/im";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
const AudioPlayer = ({ station }) => {
    const { name,
        id = "RadioPlayerID",
        urlResolved = "",
        favicon = "https://tailwindcss.com/img/card-top.jpg",
        language = [],
        tags = [] } = station || {}
    const audioRef = useRef(null)
    // const [isPoppedUp, setIsPoppedUp] = useState(true)
    const [isPoppedUp, setIsPoppedUp] = useState(station == null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)
    // playing audio
    const play = () => {
        audioRef.current.play()
        setIsPlaying(true)
    }
    // pausing audio
    const pause = () => {
        audioRef.current.pause()
        setIsPlaying(false)
    }
    // muting audio
    const mute = () => {
        audioRef.current.muted = true
        setIsMuted(true)
    }
    // unmuting audio
    const unmute = () => {
        audioRef.current.muted = false
        setIsMuted(false)
    }
    // changing volume
    const changeVolume = (vol) => {
        const newVol = parseInt(vol)
        audioRef.current.volume = newVol / 100
        setVolume(newVol)
        setIsMuted(newVol === 0)
        console.log({ vol, newVol })
    }
    // changing playing state
    const changePlayingState = () => {
        console.dir(audioRef.current)
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }
    // changing muted state
    const changeMutedState = () => {
        if (isMuted) {
            unmute()
        } else {
            mute()
        }
    }
    useEffect(() => {
        setIsPoppedUp(station !== null)
    }, [station])
    return (
        <div
            key={id}
            className={`fixed top-0 left-0 w-full h-full  z-[98] ${isPoppedUp ? " visible" : " invisible"} flex justify-center items-center`}

        >
            <span
                onClick={() => {
                    setIsPoppedUp(false)
                    console.log("first click")
                }}
                className={`absolute top-0 left-0 w-full h-full bg-black  z-[99] ${isPoppedUp ? "bg-opacity-70 visible" : "bg-opacity-0 invisible"} cursor-pointer`}></span>
            <div className="bg-gray-900 shadow-lg rounded-lg max-w-[45rem] w-full z-[101]" tabIndex={1}>
                <audio
                    autoPlay
                    src={urlResolved}
                    className="w-0 h-0 hidden"
                    ref={audioRef}
                    onError={e => console.log("error")}
                ></audio>
                <div className="flex">
                    <div>
                        <Image
                            className="w-full rounded hidden md:block"
                            src={favicon}
                            alt="Album Pic" />
                    </div>
                    <div className="w-full p-8">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl text-grey-darkest font-medium">{name}</h3>
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
                            {/* add to fav button */}
                            <button
                                className=" text-2xl"
                            >
                                <FaHeart />
                            </button>
                        </div>
                        <div className="flex justify-between items-center mt-8">
                            {/* All the button list */}
                            <button
                                className="text-gray-200 text-2xl"
                                disabled
                            >
                                <FaShuffle />
                            </button>
                            <button
                                className="text-gray-200 text-2xl"
                                disabled
                            >
                                <IoIosSkipBackward />
                            </button>
                            <button
                                className="bg-gray-200 text-gray-900 p-8 rounded-full bg-red-light shadow-lg"
                                onClick={() => {
                                    changePlayingState()
                                }}
                            >
                                {
                                    isPlaying ? <FaPause /> : <FaPlay />
                                }
                            </button>
                            <button
                                className="text-gray-200 text-2xl"
                                disabled>
                                <IoIosSkipForward />
                            </button>
                            <button
                                className="text-gray-200 text-2xl"
                                disabled>
                                <ImLoop />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-x-1">
                    <div className="mx-8 py-4 flex-1">
                        <div className="flex justify-between text-sm text-gray-200">
                            <p>0:00</p>
                            <p>4:20</p>
                        </div>
                        <div className="mt-1">
                            <div className="h-1 bg-gray-400 rounded-full">
                                <div className="w-full h-1 bg-white rounded-full relative">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-2 px-2 mr-2">
                        <button
                            className="text-2xl text-gray-200 "
                            onClick={() => {
                                changeMutedState()
                            }}
                        >
                            {
                                isMuted ? <HiMiniSpeakerXMark /> : <HiMiniSpeakerWave />
                            }
                        </button>
                        <input
                            className="cursor-pointer"
                            max={100}
                            min={0}
                            step={10}
                            defaultValue={volume}
                            onChange={e => {
                                changeVolume(e.target.value)
                            }}
                            type="range" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AudioPlayer