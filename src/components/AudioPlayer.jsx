import { useEffect, useRef, useState } from "react"
import Image from "./Image"
import { FaHeart, FaPause, FaPlay } from "react-icons/fa";
import { FaRadio, FaShuffle } from "react-icons/fa6";
import { ImLoop } from "react-icons/im";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
const AudioPlayer = ({ station }) => {
    const { name = "No Channel Selected",
        id = "RadioPlayerID",
        urlResolved = "",
        codec = "No Codec",
        favicon = "https://tailwindcss.com/img/card-top.jpg",
        language = [],
        tags = [] } = station || {}
    const audioRef = useRef(null)
    const [isPoppedUp, setIsPoppedUp] = useState(false)
    // const [isPoppedUp, setIsPoppedUp] = useState(station !== null)
    const [isPlaying, setIsPlaying] = useState(false)
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
        if (station) {
            if (isPlaying) {
                pause()
            } else {
                play()
            }
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
        setVolume(audioRef.current.volume)
        setIsMuted(audioRef.current.muted)
        setIsPlaying(!audioRef.current.paused)

    }, [audioRef])
    // useEffect(() => {
    //     if (station !== null) {
    //         setIsPoppedUp(true)
    //     }
    // }, [station])
    return (
        <>
            <div
                key={id}
                className={`fixed top-0 left-0 w-full h-full  z-[98] ${isPoppedUp ? " visible" : " invisible"} flex justify-center items-center`}

            >
                <span
                    onClick={() => {
                        setIsPoppedUp(false)
                    }}
                    className={`absolute top-0 left-0 w-full h-full bg-black  z-[99] bg-opacity-70 ${isPoppedUp ? "visible" : "bg-opacity-0 invisible"} cursor-pointer duration-200`}></span>
                <div className={`bg-gray-900 shadow-lg rounded-lg max-w-[45rem] w-full z-[101] px-2 py-3 ${isPoppedUp ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-0  translate-x-48 translate-y-48"} origin-bottom-right duration-200`} tabIndex={1}>
                    <audio
                        autoPlay
                        src={urlResolved}
                        className="w-0 h-0 hidden"
                        ref={audioRef}
                        onPlay={() => {
                            setIsPlaying(true)
                            setIsPoppedUp(true)
                        }}
                        onChange={() => setIsPoppedUp(true)}
                        onError={() => console.log("error")}
                    ></audio>
                    <div className="flex">
                        <div className="max-w-[250px] w-full aspect-square rounded-full overflow-hidden">
                            <Image
                                className={`min-w-full min-h-full ${isPlaying ? "spinner" : ""} origin-center hidden md:block`}
                                src={favicon}
                                alt="Album Pic" />
                        </div>
                        <div className="w-full p-8">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-2xl text-grey-darkest font-medium">{name}</h3>
                                    <div className="text-xs mt-1 flex flex-wrap gap-1">Codec : <span
                                        className="px-1 bg-violet-900 rounded mr-1"
                                    >
                                        {codec}
                                    </span>
                                    </div>
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
                                    className="text-gray-200 text-2xl disabled:cursor-not-allowed"
                                    disabled
                                >
                                    <FaShuffle />
                                </button>
                                <button
                                    className="text-gray-200 text-2xl disabled:cursor-not-allowed"
                                    disabled
                                >
                                    <IoIosSkipBackward />
                                </button>
                                <button
                                    className="bg-gray-200 text-gray-900 p-8 rounded-full bg-red-light shadow-lg disabled:cursor-not-allowed"
                                    onClick={() => {
                                        changePlayingState()
                                    }}
                                >
                                    {
                                        isPlaying ? <FaPause /> : <FaPlay />
                                    }
                                </button>
                                <button
                                    className="text-gray-200 text-2xl disabled:cursor-not-allowed"
                                    disabled>
                                    <IoIosSkipForward />
                                </button>
                                <button
                                    className="text-gray-200 text-2xl disabled:cursor-not-allowed"
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
                                <p>Live</p>
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
            {
                !isPoppedUp && isPlaying && <button
                    className={`text-4xl bg-gray-200/50 p-3 rounded-full fixed bottom-[10px] right-[10px] text-violet-900 origin-center duration-200 transition-all z-[101] ${isPoppedUp ? " opacity-0 invisible" : " opacity-100 visible spinner"}`}
                    onClick={() => {
                        setIsPoppedUp(true)
                    }}
                >
                    <FaRadio />
                </button >
            }

        </>
    )
}

export default AudioPlayer