"use client"
import Link from 'next/link'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import Login from './login/page';
import Home2 from "./page2";

const User = (props) => {
  return (
    <div>
      <h2>User Name is {props.name}</h2>
    </div>
  )
}




export default function Home() {
  const router = useRouter();
  const navigate = (name) => {
    router.push(name)
  }
  return (
    <main>
      {/* <h2>This is HomePage</h2>
      <User name={'ABC'} />
      <Home2 /> */}
      <h1>Basic Routing | Make New Page</h1>
      <Link href="/login" >Go to Login Page</Link>
      <br />
      <br />
      <Link href="/about" >Go to About Page</Link>
      <br />
      <br />
      <button onClick={() => navigate("/login")} >Go to Login Page</button>
      <button onClick={() => navigate("/about")} >Go to About Page</button>

      <Login />


    </main>
  )
}



