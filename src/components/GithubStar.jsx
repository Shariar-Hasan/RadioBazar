import { FaGithub } from "react-icons/fa"

const GithubStar = () => {
    return (
        <div className="flex justify-center my-1">
            <a href="https://github.com/Shariar-Hasan/RadioBazar" className="inline-block">
                <span className="flex items-center justify-center gap-x-2 bg-gray-500 px-2 py-1 rounded-full">
                    <FaGithub className="text-xl"/>
                    <span className="text-sm">
                        Give us a Star ⭐ on GIthub
                    </span>
                </span>
            </a>
        </div>
    )
}

export default GithubStar