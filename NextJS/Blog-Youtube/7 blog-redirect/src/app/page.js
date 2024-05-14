"use client"
import Link from 'next/link'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import custom from './custom.module.css'
import other from './other.module.css'
import outside from '@/style/outside.module.css'
import style from './style.module.css'
import { useState } from 'react'
import Image from 'next/image'
import Profile from '../../public/vercel.svg'

import { Roboto } from 'next/font/google'
import { API_BASE_URL } from '@/config/constants'


const roboto = Roboto({
  weight: '100',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const router = useRouter();
  const navigate = (name) => {
    router.push(name)
  }

  const [color, setColor] = useState('red');
  const { red } = style;
  console.log(Profile);
  console.log(process.env);
  console.log(process.env.NODE_ENV);
  console.log(process.env.SERVER_PASSWORD);


  return (
    <main>
      <h1>Dynamic Routing</h1>
      <Link href="/login" >Go to Login Page</Link>
      <br />
      <br />
      <Link href="/about" >Go to About Page</Link>
      <br />
      <br />
      <button onClick={() => navigate("/login")} >Go to Login Page</button>
      <button onClick={() => navigate("/about")} >Go to About Page</button>

      {/* <main>
        <h4 className={custom.main} >CSS Modules with Next js</h4>
        <h4 className={other.main} >CSS Modules with Next js</h4>
        <h4 className={outside.main} >Outside css</h4>

        <h1 className={color == 'red' ? style.red : style.green} >Condtion with Style </h1>
        <h2 style={{ backgroundColor: color == 'red' ? 'red' : 'green' }} >Heading 2</h2>
        <h3 id={style.orange} >Heading 3</h3>

        <h4 className={red}>Dummy text</h4>
        <h4 className={red}>Dummy text</h4>
        <h4 className={red}>Dummy text</h4>
        <h4 className={red}>Dummy text</h4>
        <button onClick={() => setColor("green")} >Update Color</button>
      </main> */}

      <main>
        <h1>Image Optimization</h1>
        {/* <Image src={Profile} />
        <img  src={Profile.src}/> */}

        <Image
          src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={200}
          height={200}
          alt='image'
        />

        <img
          height={200} width={200} alt='image'
          src="https://images.unsplash.com/photo-1560707303-4e980ce876ad?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

      </main>

      <main>
        {/* <h1 style={{fontFamily:'Roboto', fontWeight: 100}}>Font optimization</h1> */}
        <h1 className={roboto.className}> Font optimization usinh NextJs Font feature</h1>

        <h1>Static Assets in Next</h1>
        <img height={200} width={200} alt='image' src="/dummy.png" />
      </main>

        <main>
          {
            process.env.NODE_ENV == "development" ?
              <h1>You are on development Mode</h1>
              :
              <h1>You are on Production Mode</h1>
          }
          <h1>Environment Variables in Next js </h1>

          <h1> {API_BASE_URL}</h1>
        </main>


      </main>
      )
}


