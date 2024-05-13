'use client'

import { redirect } from "next/navigation"
import { useState } from "react"

export default function Page() {

  // redirect('/');
  
  const [h3Style, setH3Style] = useState({ backgroundColor: 'green' })
  return (<div>
    <h1 style={{ backgroundColor: "blue" }} >User Page</h1>
    <h2>Heading 2 in user page</h2>
    <h3 style={h3Style} >Heading 3 for user</h3>
    <button onClick={() => setH3Style({ backgroundColor: 'red' })}>Update Style</button>

  </div>)
}