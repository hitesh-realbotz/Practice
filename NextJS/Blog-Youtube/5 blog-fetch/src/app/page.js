"use client"
import Link from 'next/link'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import custom from './custom.module.css'
import other from './other.module.css'
import outside from '@/style/outside.module.css'
import style from './style.module.css'
import { useState } from 'react'


export default function Home() {
  const router = useRouter();
  const navigate = (name) => {
    router.push(name)
  }

  const [color, setColor] = useState('red');
  const {red} = style;
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

      <main>
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
      </main>


    </main>
  )
}


