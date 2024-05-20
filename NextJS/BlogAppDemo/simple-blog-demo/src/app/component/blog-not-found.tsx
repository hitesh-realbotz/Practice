"use client"
import { useRouter } from "next/navigation";

const BlogNotFound = () => {
    const router = useRouter();
    const navigate = () => {
        router.push('/')
    }

    return (
        <>
            <div className="flex flex-col items-center  h-screen">
                <h1 className="font-extrabold text-red-400 text-2xl mb-2 text-center">Blog Not Found</h1>
                <p className="text-center">The blog you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <p className="text-center">Please check the URL for any mistakes, or click the button below to go back to the homepage.</p>
                <button className="bg-blue-200 text-black rounded-lg border-black border-2 px-4" onClick={() => navigate()}>Go to Homepage</button>
            </div>
        </>
    )
}
export default BlogNotFound;