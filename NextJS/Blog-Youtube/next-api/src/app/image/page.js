"use client"

import { useState } from "react";

export default function Page() {

    const [file, setFile] = useState();

    const onSubmit = async(e) => {
        e.preventDefault();
        console.log(file);
        const data = new FormData();

        data.set('file', file);
        let result = await fetch("api/upload", {
            method:"POST",
            body: data
        });
        result = await result.json();
        if (result.success) {
            alert("Image uploaded!");
        }
        console.log(result);
    }
    return (
        <main>
            <h1>Upload Image</h1>
            <form onSubmit={(e)=>onSubmit(e)}>
                <input type="file" name="file" onChange={(e)=> setFile(e.target.files?.[0])} />
                <button type="submit">Upload Image</button>
            </form>
        </main>
    );
}