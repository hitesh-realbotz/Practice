"use client"
import { useRouter } from "next/navigation"

export default function NotFound() {

    const router = useRouter();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <p>Please check the URL for any mistakes, or click the button below to go back to the homepage.</p>
            <button className="btn btn-info" onClick={() => router.push("/")}>Go to Homepage</button>
        </div>
    )
}